import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { isEqual } from "lodash";
import { appEmitter } from "../../App";
import FormHeader from "../Commons/FormHeader";
import IdSection from "../Commons/IdSection";
import ChampsClosed from "./ChampsClosed";
import FormFooter from "../Commons/FormFooter";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";

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
};

const ProAmMulti = () => {
  const {
    state: { formId, i },
  } = useLocation();

  const [info, setInfo] = useState(INIT_INFO);

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
      newSelect: select,
    }) => {
      const entry = {
        age,
        level,
        dance,
        division,
        syllabus,
      };

      setInfo((prevState) => ({
        ...prevState,
        entries: select
          ? [...prevState.entries, entry]
          : prevState.entries.filter((obj) => !isEqual(obj, entry)),
      }));
    };

    const entryListener = appEmitter.addListener("3DChamp", onUpdateEntries);

    return () => {
      entryListener.remove();
    };
  }, [info]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("");
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader title1={`${i + 1}.PRO_AM`} title2="MULTI DANSES" />
          <IdSection info={info} handleChange={handleChange} />
          <ChampsClosed entries={info.entries} />
          <FormFooter />
        </form>
        <FormsControls />
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
