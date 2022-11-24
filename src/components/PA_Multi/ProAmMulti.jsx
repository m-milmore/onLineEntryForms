import React, { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { isEqual } from "lodash";
import { nanoid } from "nanoid";
import { appEmitter, FormsContext } from "../../App";
import FormHeader from "../Commons/FormHeader";
import IdSection from "../Commons/IdSection";
import Championships from "./Championships";
import Scholarships from "./Scholarships";
import ProAmSolos from "./ProAmSolos";
import FormFooter from "../Commons/FormFooter";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";
import { INIT_MSG } from "../../constants";

const INIT_INFO = {
  form: "paMD",
  studio: "One Studio",
  city: "Rochester",
  state: "New York",
  stateAbrr: "NY",
  phone: "323-987-6541",
  email: "y@y.com",
  teacherFirstName: "Fred",
  teacherLastName: "Frickle",
  member: "222333",
  studentFirstName: "Gail",
  studentLastName: "Wind",
  studentGender: "F",
  entries: [
    {
      entryId: nanoid(),
      level: "",
      age: "All",
      syllabus: "ouvert",
      category: "solo",
      dance: "",
      division: "",
    },
  ],
};

const ProAmMulti = () => {
  const {
    state: { formId, i },
  } = useLocation();
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

  useEffect(() => {
    const onUpdateEntries = ({
      age,
      level,
      dance,
      division,
      syllabus,
      category,
      newSelect: select,
    }) => {
      const entry = {
        age,
        level,
        dance,
        division,
        syllabus,
        category,
      };

      setInfo((prevState) => ({
        ...prevState,
        entries: select
          ? [...prevState.entries, entry]
          : prevState.entries.filter((obj) => !isEqual(obj, entry)),
      }));
    };

    const entryListener = appEmitter.addListener("paMulti", onUpdateEntries);

    return () => {
      entryListener.remove();
    };
  }, [info]);

  // data sent from RegSelect component for solo level & division
  // data sent from SoloRow component for solo dance
  useEffect(() => {
    const onUpdateSelect = ({ entryId, name, value }) => {
      setInfo((prevState) => ({
        ...prevState,
        entries: prevState.entries.map((entry) =>
          entry.entryId === entryId ? { ...entry, [name]: value } : entry
        ),
      }));
    };

    const selectListener = appEmitter.addListener(
      "paSoloSelect",
      onUpdateSelect
    );

    return () => {
      selectListener.remove();
    };
  }, [info]);

  useEffect(() => {
    const onDeleteSolo = ({ entryId }) => {
      setInfo((prevState) => ({
        ...prevState,
        entries: prevState.entries.filter((entry) => entry.entryId !== entryId),
      }));
    };

    const deleteSoloListener = appEmitter.addListener(
      "deleteSolo",
      onDeleteSolo
    );

    return () => {
      deleteSoloListener.remove();
    };
  }, [info]);

  useEffect(() => {
    const onAddSolo = (newEntry) => {
      setInfo((prevState) => ({
        ...prevState,
        entries: [...prevState.entries, newEntry],
      }));
    };

    const addSoloListener = appEmitter.addListener("addSolo", onAddSolo);

    return () => {
      addSoloListener.remove();
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
    let missingInEntries = false;
    info.entries.forEach((entry) => {
      if (entry.category === "solo") {
        if (
          !entry.level ||
          !entry.division ||
          entry.level === "--" ||
          entry.division === "--" ||
          !entry.dance
        )
          missingInEntries = true;
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("");
    setMsg("");
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader title1={`${i + 1}.PRO_AM`} title2="MULTI DANSES" />
          <IdSection info={info} handleChange={handleChange} />
          <Championships entries={info.entries} syllabus="fermé" />
          <Championships entries={info.entries} syllabus="ouvert" />
          <Scholarships entries={info.entries} />
          <ProAmSolos entries={info.entries} />
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

export default ProAmMulti;
