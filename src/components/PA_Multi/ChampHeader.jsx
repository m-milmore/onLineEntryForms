import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  paChampDances,
  paChampClosedLevels,
  paChampOpenLevels,
  danceNames,
} from "../../constants";

const ChampHeader = ({ syllabus }) => {
  const paChampLevels =
    syllabus === "fermé" ? paChampClosedLevels : paChampOpenLevels;

  return (
    <>
      <tr>
        <td></td>
        {paChampDances.map((dance) => {
          const dances = dance.split(" ")[1].replace(/[(//)]/g, "");
          return (
            <OverlayTrigger
              key={dance}
              placement="bottom"
              overlay={
                <Tooltip>
                  <strong>{danceNames[dances.toLowerCase()]}</strong>
                </Tooltip>
              }
            >
              <td colSpan={syllabus === "fermé" ? "2" : "3"}>{dance}</td>
            </OverlayTrigger>
          );
        })}
      </tr>
      <tr>
        <td></td>
        {paChampDances.map((dance) =>
          paChampLevels.map((level) => <td key={level}>{level}</td>)
        )}
      </tr>
    </>
  );
};

export default ChampHeader;
