import React, { useState } from "react";
import FormHeader from "../Commons/FormHeader";
import SummaryTable from "./SummaryTable";
import FormsControls from "../Commons/FormsControls";
import "./Summary.css";

const Summary = () => {
  const [submittable, setSubmittable] = useState(false);

  return (
    <div className="container text-center py-3">
      <FormHeader title1="bon de commande" />
      <SummaryTable />
      <FormsControls submittable={submittable} hideBtn={true} />
    </div>
  );
};

export default Summary;
