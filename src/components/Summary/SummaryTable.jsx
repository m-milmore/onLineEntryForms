import React from "react";
import { nanoid } from "nanoid";
import SummaryTableHeader from "./SummaryTableHeader";
import SummaryBigSide from "./SummaryBigSide";
import SummaryCat from "./SummaryCat";
import SummaryTableFooter from "./SummaryTableFooter";
import { summaryCategories } from "../../constants";

const SummaryTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 mb-1 table-print">
        <SummaryTableHeader />
        <tbody>
          <SummaryBigSide />
          {summaryCategories.map((cat) => {
            const section = cat[0].split("|")[7];
            return <SummaryCat key={nanoid()} cat={cat} section={section} />;
          })}
        </tbody>
        <SummaryTableFooter total={0} />
      </table>
    </div>
  );
};

export default SummaryTable;
