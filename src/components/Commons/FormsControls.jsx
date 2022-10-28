import React from "react";
import { useNavigate } from "react-router-dom";
import AppMsg from "../Utils/AppMsg";

const FormsControls = ({ disableSaveBtn, msg, handleSave }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 d-print-none ">
      <input
        className="btn btn-primary me-2"
        type="button"
        value="Save"
        disabled={disableSaveBtn}
				onClick={handleSave}
      />
      <input
        className="btn btn-primary me-2"
        type="button"
        value="Formulaires"
        onClick={() => navigate("/")}
      />
      <AppMsg msg={msg} />
    </div>
  );
};

export default FormsControls;
