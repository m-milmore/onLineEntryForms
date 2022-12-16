import React, { useContext } from "react";
import { FormsContext } from "../../App";
import ScholTitle from "./ScholTitle";
import ScholHeader from "./ScholHeader";
import Multi from "./Multi";
import { paScholDances, ageGroups } from "../../constants";

const Scholarships = ({ formId }) => {
  const { forms } = useContext(FormsContext);
  const currForm = forms.filter((form) => form.formId === formId);
  const entries = currForm[0].entries;
  const { paScholAgeGroups } = ageGroups;

  return (
    <div>
      <ScholTitle />
      <table
        className="table table-sm table-bordered"
        style={{ tableLayout: "fixed" }}
      >
        <tbody className="tbody-pa3d">
          <ScholHeader />
          {paScholAgeGroups.map((age) => {
            const ageStr = age.split("|")[0];
            const ageTypeStr = age.split("|")[2];
            return (
              <tr key={ageStr}>
                <td>{ageStr}</td>
                {paScholDances.map((dance) => (
                  <Multi
                    key={age + "open" + dance}
                    age={ageStr}
                    ageType={ageTypeStr}
                    level="open"
                    danceDiv={dance}
                    syllabus="open"
                    category="schol"
                    entries={entries}
                    formId={formId}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scholarships;
