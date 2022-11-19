import React from "react";
import "./Championships.css";
import ChampHeader from "./ChampHeader";
import Multi from "./Multi";
import {
  paChampDances,
  paChampClosedLevels,
  paChampOpenLevels,
  ageGroups,
} from "../../constants";

const Championships = ({ entries, syllabus }) => {
  const { paChampAgeGroups } = ageGroups;
  const paChampLevels =
    syllabus === "fermé" ? paChampClosedLevels : paChampOpenLevels;

  return (
    <div>
      <div className="text-uppercase fs-5 fw-bold text-start">
        <u>Championnats {syllabus}</u>
      </div>
      <table
        className="table table-sm table-bordered"
        style={{ tableLayout: syllabus !== "fermé" ? "fixed" : null }}
      >
        <tbody className="tbody-pa3d">
          <ChampHeader syllabus={syllabus} />
          {paChampAgeGroups.map((age) => {
            const ageStr = age.split("|")[0];
            return (
              <tr key={ageStr}>
                <td>{ageStr}</td>
                {paChampDances.map((dance) =>
                  paChampLevels.map((level) => (
                    <Multi
                      key={ageStr + level + dance}
                      age={ageStr}
                      level={level}
                      danceDiv={dance}
                      syllabus={syllabus}
                      category="champ"
                      entries={entries}
                    />
                  ))
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Championships;
