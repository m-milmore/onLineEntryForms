import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Schol from "./Schol";
import {
  paScholAgeGroups,
  paScholDances,
  paScholMultiDances,
} from "../../constants";

const Scholarships = ({ entries }) => {
  return (
    <div>
      <div className="text-uppercase fs-5 fw-bold text-start">
        <div className="d-flex justify-content-between">
          <u>championnats canadiens pro-am Bourses d'étude</u>
          <span className="me-3 text-center text-md-start">
            10 danses individuelles requises
          </span>
        </div>
        <div className="text-center">
          <span
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              borderRadius: "3px",
              padding: "0 5px",
            }}
          >
            ouvert aux compétiteurs du canada seulement
          </span>
        </div>
      </div>
      <table
        className="table table-sm table-bordered"
        style={{ tableLayout: "fixed" }}
      >
        <tbody className="tbody-pa3d">
          <tr>
            <td></td>
            {paScholDances.map((dance, i) => (
              <OverlayTrigger
                key={dance}
                placement="bottom"
                overlay={
                  <Tooltip>
                    <strong>{paScholMultiDances[i]}</strong>
                  </Tooltip>
                }
              >
                <td>{dance}</td>
              </OverlayTrigger>
            ))}
          </tr>
          {paScholAgeGroups.map((age) => (
            <tr key={age}>
              <td>{age}</td>
              {paScholDances.map((dance) => (
                <Schol
                  key={age + dance}
                  age={age}
                  danceDiv={dance}
                  entries={entries}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scholarships;
