import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormsContext, UserContext } from "../../App";
import SubmittableIcons from "./SubmittableIcons";
import AppMsg from "../Utils/AppMsg";
import { INIT_MSG } from "../../constants";

const FormsControls = ({
  submittable,
  hideBtns = false,
  hidePayBtn = true,
}) => {
  const navigate = useNavigate();
  const { forms } = useContext(FormsContext);
  const { entriesService } = useContext(UserContext);
  const [disableCheckout, setDisableCheckout] = useState(true);
  const [msg, setMsg] = useState(INIT_MSG);

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

  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(forms));
  }, [forms]);

  const handleCheckout = async () => {
    const summaryForm = forms.filter((form) => form.formName === "Sommaire");
    const items = summaryForm[0].items;
    setMsg("processing entries...");
    try {
      const response = await entriesService.getStripeURL(items);
      await setMsg(INIT_MSG);
      window.location.href = response;
    } catch (error) {
      console.error(error);
      setMsg(error.request.response);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 d-print-none ">
      {!hideBtns ? <SubmittableIcons submittable={submittable} /> : null}
      <input
        className="btn btn-primary me-2"
        type="button"
        value="Formulaires"
        onClick={() => navigate("/")}
      />
      {!hideBtns ? (
        <input
          className="btn btn-info me-2"
          type="button"
          value="Sommaire"
          onClick={() => navigate("/summary")}
        />
      ) : null}
      {!hidePayBtn ? (
        <input
          className={`btn btn-success me-2 ${
            disableCheckout ? "disabled" : ""
          }`}
          type="button"
          value="Payer"
          onClick={handleCheckout}
        />
      ) : null}
      <AppMsg msg={msg} />
    </div>
  );
};

export default FormsControls;
