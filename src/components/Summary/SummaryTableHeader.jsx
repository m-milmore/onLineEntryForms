import React from "react";
import "./SummaryTableHeader.css";
import { summaryDeadlines } from "../../constants";

const SummaryTableHeader = () => {
  return (
    <thead>
      <tr>
        <th
          className="summary-thead"
          colSpan="3"
          style={{ border: "1px solid white" }}
        >
          &nbsp;
        </th>
        <th className="summary-thead" colSpan="3">
          <div className="bg-lgray border">
            <i className="me-5 fa-solid fa-down fa-xl"></i>
            {summaryDeadlines[0].toUpperCase()}
          </div>
        </th>
        <th className="summary-thead" colSpan="3">
          <i className="me-3 fa-solid fa-down fa-xl"></i>
          {summaryDeadlines[1].toUpperCase()}
        </th>
      </tr>
    </thead>
  );
};

export default SummaryTableHeader;
