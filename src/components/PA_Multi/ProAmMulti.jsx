import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { isEqual } from "lodash";
import { appEmitter } from "../../App";
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
  entries: [],
  solos: "",
};

const ProAmMulti = () => {
  const {
    state: { formId, i },
  } = useLocation();

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
      solos,
    } = info;
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
        (info.entries.length > 0 || solos)
    );
  }, [info]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleSolos = ({ target: { value } }) => {
    setInfo({ ...info, solos: value });
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
          <ProAmSolos solos={info.solos} handleSolos={handleSolos} />
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
