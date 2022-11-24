import React, { useState, useCallback } from "react";
import FormHeader from "../Commons/FormHeader";
import SummaryTable from "./SummaryTable";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";
import "./Summary.css";
import { INIT_MSG } from "../../constants";

const Summary = () => {
  const [msg, setMsg] = useState(INIT_MSG);
  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("");
    setMsg("");
  };

  return (
    <>
      <div className="container text-center py-3">
        <FormHeader title1="bon de commande" />
        <SummaryTable handleSubmit={handleSubmit} />
        <FormsControls msg={msg} hideBtn={true} />
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
