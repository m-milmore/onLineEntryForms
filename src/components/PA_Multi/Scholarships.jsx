import React from "react";
import ScholTitle from "./ScholTitle";
import ScholHeader from "./ScholHeader";
import Multi from "./Multi";
import { paScholDances, ageGroups } from "../../constants";

const Scholarships = ({ entries }) => {
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
            return (
              <tr key={ageStr}>
                <td>{ageStr}</td>
                {paScholDances.map((dance) => (
                  <Multi
                    key={age + "open" + dance}
                    age={ageStr}
                    level="open"
                    danceDiv={dance}
                    syllabus="open"
                    category="schol"
                    entries={entries}
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
