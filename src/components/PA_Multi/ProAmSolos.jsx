import React from "react";
import SoloTableHeader from "./SoloTableHeader";
import SoloRow from "./SoloRow";
import SoloTableFooter from "./SoloTableFooter";

const ProAmSolos = ({ entries }) => {
  return (
    <>
      <div className="text-start">
        <span className="text-uppercase fs-5 fw-bold text-decoration-underline">
          démonstration solo
        </span>
      </div>
      <div className="table-responsive">
        <table className="table table-sm fs-6 mb-1 table-print">
          <SoloTableHeader />
          <tbody>
            {entries.map((entry) =>
              entry.entryId ? (
                <SoloRow key={entry.entryId} entry={entry} />
              ) : null
            )}
          </tbody>
          <SoloTableFooter />
        </table>
      </div>
    </>
  );
};

export default ProAmSolos;
