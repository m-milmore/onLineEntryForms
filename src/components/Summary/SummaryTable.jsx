import React from "react";
import { nanoid } from "nanoid";
import SummaryTableHeader from "./SummaryTableHeader";
import SummarySide from "./SummarySide";
import SummaryCalculate from "./SummaryCalculate";
import SummaryEmptyLine from "./SummaryEmptyLine";
import SummaryTableFooter from "./SummaryTableFooter";
import { summaryCategories } from "../../constants";

const SummaryTable = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="table-responsive">
        <table className="table table-sm fs-6 mb-1 table-print">
          <SummaryTableHeader />
          <tbody>
            {summaryCategories.map((cat) => {
              const subCat = cat.split("|")[0];
              switch (subCat) {
                case "bigSide":
                case "summarySide":
                  return <SummarySide key={nanoid()} data={cat} />;
                case "summaryEmpty":
                  return <SummaryEmptyLine key={nanoid()} />;
                default:
                  return <SummaryCalculate key={nanoid()} data={cat} />;
              }
            })}
          </tbody>
          <SummaryTableFooter total={0} />
        </table>
      </div>
    </form>
  );
};

export default SummaryTable;
