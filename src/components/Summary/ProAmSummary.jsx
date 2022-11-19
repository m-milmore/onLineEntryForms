import React from "react";
import SummarySide from "../Commons/SummarySide";
import PASummaryCalculate from "./PASummaryCalculate";
import { summaryPACategories } from "../../constants";

const ProAmSummary = () => {
  return (
    <>
      <SummarySide section="PRO-AM"/>
      {summaryPACategories.map((data) => (
        <PASummaryCalculate key={data.split("|")[0]} data={data} />
      ))}
    </>
  );
};

export default ProAmSummary;
