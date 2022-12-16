import React, { useContext } from "react";
import { FormsContext } from "../../App";
import SoloTableHeader from "./SoloTableHeader";
import SoloRow from "./SoloRow";
import SoloTableFooter from "./SoloTableFooter";

const ProAmSolos = ({ formId }) => {
  const { forms } = useContext(FormsContext);
  const currForm = forms.filter((form) => form.formId === formId);
  const entries = currForm[0].entries;

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
              entry.category === "solo" ? (
                <SoloRow key={entry.entryId} entry={entry} formId={formId} />
              ) : null
            )}
          </tbody>
          <SoloTableFooter formId={formId} />
        </table>
      </div>
    </>
  );
};

export default ProAmSolos;
