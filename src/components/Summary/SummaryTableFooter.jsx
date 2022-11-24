import React from "react";
import { summaryTableFootNote } from "../../constants";

const SummaryTableFooter = ({ total }) => {
  return (
    <tfoot>
      <tr style={{ border: "1px solid white" }}>
        <td colSpan="4">&nbsp;</td>
        <td
          colSpan="4"
          className="text-center text-uppercase"
          style={{ fontSize: "1.5rem", fontWeight: "bold", lineHeight: "90%" }}
        >
          {summaryTableFootNote}
        </td>
        <td colSpan="3" style={{ border: "2px solid black" }}>
          <div
            style={{
              fontWeight: "bold",
              textAlign: "start",
              fontSize: "1.2rem",
            }}
          >
            TOTAL: {total}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default SummaryTableFooter;
