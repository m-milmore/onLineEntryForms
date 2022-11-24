import React, { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { appEmitter, UserContext, FormsContext } from "../../App";
import FormHeader from "../Commons/FormHeader";
import IdSection from "../Commons/IdSection";
import AgeSection from "./AgeSection";
import SingleDances from "./SingleDances";
import FormFooter from "../Commons/FormFooter";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";
import { INIT_MSG } from "../../constants";

const INIT_INFO = {
  form: "paSD",
  studio: "Wow!",
  city: "Heckville",
  state: "Maine",
  phone: "212-321-6547",
  email: "z@z.com",
  teacherFirstName: "Ed",
  teacherLastName: "Eckell",
  member: "654321",
  studentFirstName: "Faith",
  studentLastName: "Flash",
  studentGender: "F",
  entries: [
    {
      entryId: nanoid(),
      level: "",
      age: "",
      syllabus: "fermé",
      category: "single",
      categories: [],
    },
    {
      entryId: nanoid(),
      level: "",
      age: "",
      syllabus: "ouvert",
      category: "single",
      categories: [],
    },
  ],
};

const ProAm1Dance = () => {
  const {
    state: { formId, i },
  } = useLocation();
  const { entriesService } = useContext(UserContext);
  const { setForms } = useContext(FormsContext);
  const [info, setInfo] = useState(INIT_INFO);

  const [submittable, setSubmittable] = useState(false);
  const [msg, setMsg] = useState(INIT_MSG);

  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const data = localStorage.getItem(formId);
    if (data) {
      setInfo(JSON.parse(data));
    }
  }, [formId]);

  useEffect(() => {
    localStorage.setItem(formId, JSON.stringify(info));
  }, [info, formId]);

  // data sent from BaseSelect component
  useEffect(() => {
    const onUpdateTerritory = ({ territory }) => {
      setInfo({ ...info, state: territory });
    };

    const territoryListener = appEmitter.addListener(
      "territory",
      onUpdateTerritory
    );

    return () => {
      territoryListener.remove();
    };
  }, [info]);

  // data sent from RegSelect component for single dance level & age
  useEffect(() => {
    const onUpdateSelect = ({ entryId, name, value }) => {
      setInfo((prevState) => ({
        ...prevState,
        entries: prevState.entries.map((entry) =>
          entry.entryId === entryId ? { ...entry, [name]: value } : entry
        ),
      }));
    };

    const selectListener = appEmitter.addListener("pa1DSelect", onUpdateSelect);

    return () => {
      selectListener.remove();
    };
  }, [info]);

  // data sent from Dance component, add or remove a dance: select is a true/false toggle
  useEffect(() => {
    const onUpdateComps = ({
      dance,
      danceStyle,
      entryId,
      newSelect: select,
    }) => {
      const comp = {
        dance,
        danceStyle,
      };

      setInfo((prevState) => ({
        ...prevState,
        entries: prevState.entries.map((entry) => {
          if (entry.entryId === entryId) {
            const categories = select
              ? [...entry.categories, comp]
              : entry.categories.filter(
                  (obj) =>
                    !(
                      obj.dance === comp.dance &&
                      obj.danceStyle === comp.danceStyle
                    )
                );
            return { ...entry, categories };
          } else return entry;
        }),
      }));
    };

    const compListener = appEmitter.addListener("comp", onUpdateComps);

    return () => {
      compListener.remove();
    };
  }, [info]);

  useEffect(() => {
    const onDeleteEntry = ({ entryId }) => {
      setInfo((prevState) => ({
        ...prevState,
        entries: prevState.entries.filter((entry) => entry.entryId !== entryId),
      }));
    };

    const deleteListener = appEmitter.addListener("deleteEntry", onDeleteEntry);

    return () => {
      deleteListener.remove();
    };
  }, [info]);

  // to show a "submittable_form" icon (checkmark) or an "incomplete_form" icon (xmark)
  useEffect(() => {
    const {
      studio,
      city,
      state,
      phone,
      email,
      teacherFirstName,
      teacherLastName,
      studentFirstName,
      studentLastName,
      studentGender,
    } = info;
    let missingInEntries = false;
    info.entries.forEach((entry) => {
      if (
        !entry.level ||
        !entry.age ||
        entry.level === "--" ||
        entry.age === "--" ||
        entry.categories.length === 0
      )
        missingInEntries = true;
    });
    setSubmittable(
      studio &&
        city &&
        state &&
        phone &&
        email &&
        teacherFirstName &&
        teacherLastName &&
        studentFirstName &&
        studentLastName &&
        studentGender &&
        info.entries.length > 0 &&
        !missingInEntries
    );
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              formSubmittable: submittable,
            }
          : form
      )
    );
  }, [info, formId, setForms, submittable]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleAddEntry = (syllabus) => {
    const newEntry = {
      entryId: nanoid(),
      level: "",
      age: "",
      syllabus: syllabus,
      category: "single",
      categories: [],
    };
    setInfo((prevState) => ({
      ...prevState,
      entries: [...prevState.entries, newEntry],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!info.phone.match(phoneRegex)) {
      alert("Numéro de téléphone invalide.");
      return;
    }
    const entries = [];
    info.entries.forEach((entry) => {
      entry.categories.forEach((category) => {
        const { level, age, syllabus } = entry;
        const syllabusTranslated = syllabus === "ouvert" ? "open" : "closed";
        entries.push({
          level,
          age,
          syllabus: syllabusTranslated,
          ...category,
          ...info,
        });
      });
    });
    setMsg("processing entries...");
    try {
      await entriesService.createEntries(entries);
      setMsg(INIT_MSG);
      setShowToast(true);
      setToastMsg("Entries successfully send!");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setMsg(error.response.data.error);
      } else if (error.response.status === 403) {
        setMsg("Unauthorized");
      } else {
        setMsg(error.message);
      }
    }
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader
            title1={`${i + 1}.PRO_AM`}
            title2="DANSES INDIVIDUELLES"
          />
          <IdSection info={info} handleChange={handleChange} />
          <AgeSection />
          <SingleDances
            entries={info.entries}
            syllabus="fermé"
            handleAddEntry={handleAddEntry}
          />
          <SingleDances
            entries={info.entries}
            syllabus="ouvert"
            handleAddEntry={handleAddEntry}
          />
          <FormFooter />
        </form>
        <FormsControls submittable={submittable} msg={msg} />
      </div>
      <ConfirmationToast
        show={showToast}
        onClose={toggleToast}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default ProAm1Dance;
