import React, { useState, useEffect } from "react";
import { appEmitter } from "../../App";
import { summaryTableFootNote } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryTableFooter = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const onEntryCount = ({ amount }) => {
      console.log("listener");
      setTotal((prev) => (prev += amount));
    };

    const entryCountListener = appEmitter.addListener(
      "entryCount",
      onEntryCount
    );

    return () => {
      entryCountListener.remove();
    };
  }, []);

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
            TOTAL: {Formatter.format(total)} CAN
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default SummaryTableFooter;
