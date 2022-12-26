import React, { useState, useEffect, useContext } from "react";
import { FormsContext } from "../../App";
import { summaryTableFootNote, early, priceList } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryTableFooter = () => {
  const { forms } = useContext(FormsContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cumul = 0;
    const priceType = early() ? 1 : 2;
    const summForm = forms.filter((form) => form.formName === "Sommaire");
    summForm[0].items.forEach((item) => {
      const price = priceList
        .filter((list) => list.includes(item.name))[0]
        .split("|")[priceType];
      cumul += item.quantity * price;
    });

    setTotal(cumul);
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
