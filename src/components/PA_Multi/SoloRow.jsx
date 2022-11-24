import React from "react";
import { appEmitter } from "../../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RegSelect from "../Commons/RegSelect";
import { paSDLevelsOpen, divisions } from "../../constants";

const SoloRow = ({ entry }) => {
  const handleSoloChange = ({ target: { value } }) => {
    const soloToChange = {
      entryId: entry.entryId,
      name: "dance",
      value,
    };
    appEmitter.emit("paSoloSelect", soloToChange);
  };

  const handleDeleteSolo = () => {
    const soloToDelete = {
      entryId: entry.entryId,
    };
    appEmitter.emit("deleteSolo", soloToDelete);
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={paSDLevelsOpen}
          name="level"
          value={entry.level}
          entryId={entry.entryId}
          form="paMulti"
        />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={divisions}
          name="division"
          value={entry.division}
          entryId={entry.entryId}
          form="paMulti"
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control form-control-sm ps-0 pe-1 text-primary fw-bold border-0"
          value={entry.dance}
          onChange={handleSoloChange}
        />
      </td>
      <td style={{ border: "1px solid black", verticalAlign: "middle" }}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>supprimer le solo</strong>
            </Tooltip>
          }
        >
          <div
            type="button"
            onClick={handleDeleteSolo}
            className="d-print-none"
          >
            <i
              className="fa-solid fa-square-xmark fa-xl"
              style={{ color: "red", cursor: "pointer" }}
            ></i>
          </div>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default SoloRow;
