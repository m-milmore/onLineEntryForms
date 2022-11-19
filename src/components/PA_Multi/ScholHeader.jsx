import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { paScholDances, danceNames } from "../../constants";

const ScholHeader = () => {
  return (
    <tr>
      <td></td>
      {paScholDances.map((dance, i) => {
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
            <td>{dance}</td>
          </OverlayTrigger>
        );
      })}
    </tr>
  );
};

export default ScholHeader;
