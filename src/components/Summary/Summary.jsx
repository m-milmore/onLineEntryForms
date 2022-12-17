import React from "react";
import FormHeader from "../Commons/FormHeader";
import SummaryTable from "./SummaryTable";
import FormsControls from "../Commons/FormsControls";
import "./Summary.css";

const Summary = () => {
  return (
    <div className="container text-center py-3">
      <FormHeader title1="bon de commande" />
      <SummaryTable />
      <FormsControls hideBtn={true} />
    </div>
  );
};

export default Summary;
