import React, { useEffect, useContext } from "react";
import { FormsContext } from "../../App";
import { summaryTableFootNote, priceList, early } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryTableFooter = ({total, setTotal}) => {
  const { forms } = useContext(FormsContext);

  useEffect(() => {
    forms.forEach((form) => {
      if (form.entries) {
        form.entries.forEach((entry) => {
          if (entry.ageType) {
            const list = priceList.filter((item) =>
              item.includes(entry.category + "|" + entry.ageType)
            );
            if (list.length) {
              const price = early()
                ? list[0].split("|")[2]
                : list[0].split("|")[3];
              const noSolo =
                entry.category === "solo" &&
                (!entry.level ||
                  !entry.dance ||
                  !entry.danceStyle ||
                  entry.level === "--" ||
                  entry.danceStyle === "--");
              const entryCount =
                entry.category === "single"
                  ? entry.categories.length
                  : noSolo
                  ? 0
                  : 1;
              const amount = price * entryCount;
              setTotal((prev) => (prev += amount));
            }
          }
        });
      }
    });
  }, [forms, setTotal]);

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
