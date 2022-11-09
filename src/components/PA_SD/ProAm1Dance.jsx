import React, { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { appEmitter, UserContext } from "../../App";
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
  rows: [
    {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: "fermé",
      categories: [],
    },
    {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: "ouvert",
      categories: [],
    },
  ],
};

const ProAm1Dance = () => {
  const {
    state: { formId, i },
  } = useLocation();
  const { entriesService } = useContext(UserContext);
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

  // data sent from RegSelect component for level and age
  useEffect(() => {
    const onUpdateSelect = ({ rowId, name, value }) => {
      setInfo((prevState) => ({
        ...prevState,
        rows: prevState.rows.map((row) =>
          row.rowId === rowId ? { ...row, [name]: value } : row
        ),
      }));
    };

    const selectListener = appEmitter.addListener("select", onUpdateSelect);

    return () => {
      selectListener.remove();
    };
  }, [info]);

  // data sent from Dance component, add or remove a dance: select is a true/false toggle
  useEffect(() => {
    const onUpdateComps = ({ dance, danceStyle, rowId, newSelect: select }) => {
      const comp = {
        dance,
        danceStyle,
      };

      setInfo((prevState) => ({
        ...prevState,
        rows: prevState.rows.map((row) => {
          if (row.rowId === rowId) {
            const categories = select
              ? [...row.categories, comp]
              : row.categories.filter(
                  (obj) =>
                    !(
                      obj.dance === comp.dance &&
                      obj.danceStyle === comp.danceStyle
                    )
                );
            return { ...row, categories };
          } else return row;
        }),
      }));
    };

    const compListener = appEmitter.addListener("comp", onUpdateComps);

    return () => {
      compListener.remove();
    };
  }, [info]);

  useEffect(() => {
    const onDeleteRow = ({ rowId }) => {
      setInfo((prevState) => ({
        ...prevState,
        rows: prevState.rows.filter((row) => row.rowId !== rowId),
      }));
    };

    const deleteListener = appEmitter.addListener("deleteRow", onDeleteRow);

    return () => {
      deleteListener.remove();
    };
  }, [info]);

  // to show a "submittable-form" icon or an "incomplete-form" icon
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
    let missingInRows = false;
    info.rows.forEach((row) => {
      if (
        !row.level ||
        !row.age ||
        row.level === "--" ||
        row.age === "--" ||
        row.categories.length === 0
      )
        missingInRows = true;
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
        info.rows.length > 0 &&
        !missingInRows
    );
  }, [info]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleAddRow = (syllabus) => {
    const newRow = {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: syllabus,
      categories: [],
    };
    setInfo((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, newRow],
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
    info.rows.forEach((row) => {
      row.categories.forEach((category) => {
        const { level, age, syllabus } = row;
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
            rows={info.rows}
            syllabus="fermé"
            handleAddRow={handleAddRow}
          />
          <SingleDances
            rows={info.rows}
            syllabus="ouvert"
            handleAddRow={handleAddRow}
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
