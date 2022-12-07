import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormsContext } from "../../App";
import SubmittableIcons from "./SubmittableIcons";
import AppMsg from "../Utils/AppMsg";

const FormsControls = ({ submittable, msg, hideBtn }) => {
  const navigate = useNavigate();
  const { forms } = useContext(FormsContext);
  const [disableCheckout, setDisableCheckout] = useState(true);

  useEffect(() => {
    setDisableCheckout(!forms.every((form) => form.formSubmittable === true));
  }, [forms]);

  const handleCheckout = () => {
    console.log("Handle Checkout");
    console.log("Liste de toutes les inscriptions:");
    console.log("Liste de la commande des billets:");
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 d-print-none ">
      {!hideBtn ? <SubmittableIcons submittable={submittable} /> : null}
      <input
        className="btn btn-primary me-2"
        type="button"
        value="Formulaires"
        onClick={() => navigate("/")}
      />
      {!hideBtn ? (
        <input
          className="btn btn-info me-2"
          type="button"
          value="Sommaire"
          onClick={() => navigate("/summary")}
        />
      ) : null}
      <input
        className={`btn btn-success me-2 ${disableCheckout ? "disabled" : ""}`}
        type="button"
        value="Payer"
        onClick={handleCheckout}
      />
      <AppMsg msg={msg} />
    </div>
  );
};

export default FormsControls;
