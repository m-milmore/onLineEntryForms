import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./ChampsClosed.css";
import ClosedChamp from "./ClosedChamp";
import { paChampClosedData } from "../../constants";

const ChampClosed = ({ entries }) => {
  const {
    paChampAgeGroups,
    paChampDances,
    paChampClosedLevels,
    paChampMultiDances,
  } = paChampClosedData;

  return (
    <div>
      <div className="text-uppercase fs-5 fw-bold text-start">
        <u>Championnats fermés</u>
      </div>
      <table className="table table-sm table-bordered">
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
                <td colSpan="2">{dance}</td>
              </OverlayTrigger>
            ))}
          </tr>
          <tr>
            <td></td>
            {paChampDances.map((dance) =>
              paChampClosedLevels.map((level) => <td key={level}>{level}</td>)
            )}
          </tr>
          {paChampAgeGroups.map((age) => (
            <tr key={age}>
              <td>{age}</td>
              {paChampDances.map((dance) =>
                paChampClosedLevels.map((level) => (
                  <ClosedChamp
                    key={age + level + dance}
                    age={age}
                    level={level}
                    danceDiv={dance}
                    syllabus="closed"
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

export default ChampClosed;
