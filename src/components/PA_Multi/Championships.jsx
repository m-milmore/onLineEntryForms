import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./Championships.css";
import Champ from "./Champ";
import {
  paChampAgeGroups,
  paChampDances,
  paChampClosedLevels,
  paChampOpenLevels,
  paChampMultiDances,
} from "../../constants";

const Championships = ({ entries, syllabus }) => {
  const paChampLevels =
    syllabus === "fermé" ? paChampClosedLevels : paChampOpenLevels;

  return (
    <div>
      <div className="text-uppercase fs-5 fw-bold text-start">
        <u>Championnats fermés</u>
      </div>
      <table
        className="table table-sm table-bordered"
        style={{ tableLayout: syllabus !== "fermé" ? "fixed" : null }}
      >
        <tbody className="tbody-pa3d">
          <tr>
            <td></td>
            {paChampDances.map((dance, i) => (
              <OverlayTrigger
                key={dance}
                placement="bottom"
                overlay={
                  <Tooltip>
                    <strong>{paChampMultiDances[i]}</strong>
                  </Tooltip>
                }
              >
                <td colSpan={syllabus === "fermé" ? "2" : "3"}>{dance}</td>
              </OverlayTrigger>
            ))}
          </tr>
          <tr>
            <td></td>
            {paChampDances.map((dance) =>
              paChampLevels.map((level) => <td key={level}>{level}</td>)
            )}
          </tr>
          {paChampAgeGroups.map((age) => (
            <tr key={age}>
              <td>{age}</td>
              {paChampDances.map((dance) =>
                paChampLevels.map((level) => (
                  <Champ
                    key={age + level + dance}
                    age={age}
                    level={level}
                    danceDiv={dance}
                    syllabus={syllabus}
                    entries={entries}
                  />
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Championships;
