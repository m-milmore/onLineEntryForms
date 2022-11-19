import React, { useState, useEffect, useCallback } from "react";
import FormHeader from "../Commons/FormHeader";
import SummaryTable from "./SummaryTable";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";
import "./Summary.css";
import { INIT_MSG } from "../../constants";

const Summary = () => {
  const [submittable, setSubmittable] = useState(false);

  const [msg, setMsg] = useState(INIT_MSG);
  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setSubmittable(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("");
    setMsg("");
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader title1="bon de commande" />
          <SummaryTable />
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

export default Summary;
