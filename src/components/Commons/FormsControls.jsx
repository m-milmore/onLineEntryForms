import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormsContext, UserContext } from "../../App";
import SubmittableIcons from "./SubmittableIcons";
import AppMsg from "../Utils/AppMsg";

const FormsControls = ({ submittable, msg, hideBtn }) => {
  const navigate = useNavigate();
  const { forms } = useContext(FormsContext);
  const { entriesService } = useContext(UserContext);
  const [disableCheckout, setDisableCheckout] = useState(true);

  useEffect(() => {
    const formsWoSummary = forms.filter((form) => form.formName !== "Sommaire");
    const summaryForm = forms.filter((form) => form.formName === "Sommaire");

    forms.length > 1
      ? setDisableCheckout(
          formsWoSummary.some((form) => form.formSubmittable === false)
        )
      : setDisableCheckout(
          summaryForm.some((form) => form.formSubmittable === false)
        );
  }, [forms]);

  const handleCheckout = async () => {
    const summaryForm = forms.filter((form) => form.formName === "Sommaire");
    const items = summaryForm[0].items;
    try {
      const response = await entriesService.getStripeURL(items);
      window.location.href = response;
    } catch (error) {
      console.error(error);
    }
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
