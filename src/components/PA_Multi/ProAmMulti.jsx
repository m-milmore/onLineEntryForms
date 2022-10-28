import React, { useState, useCallback } from "react";
import FormHeader from "../Commons/FormHeader";
import FormsControls from "../Commons/FormsControls";
import ConfirmationToast from "../Utils/ConfirmationToast";

const ProAmMulti = () => {
  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader title1="PRO_AM" title2="MULTI DANSES" />
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
