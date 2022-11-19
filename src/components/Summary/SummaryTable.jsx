import React from "react";
import SummaryTableHeader from "./SummaryTableHeader";
import ProAmSummary from "./ProAmSummary";

const SummaryTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 mb-1 table-print">
        <SummaryTableHeader />
        <tbody>
          <ProAmSummary />
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
