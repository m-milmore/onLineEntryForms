import React from "react";
import { appEmitter } from "../../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RegSelect from "./RegSelect";
import Division from "./Division";
import {
  paSDDanceStyles,
  paSDAgesAbbr,
  paSDLevelsClosed,
  paSDLevelsOpen,
} from "../../constants";
import "./TableRow.css";
import PropTypes from "prop-types";

const TableRow = ({ row }) => {
  const levels = row.syllabus === "fermé" ? paSDLevelsClosed : paSDLevelsOpen;
  const dances = row.categories.length;

  const handleDeleteRow = (rowId) => {
    const rowToDelete = {
      rowId,
    };
    appEmitter.emit("deleteRow", rowToDelete);
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={levels}
          name="level"
          value={row.level}
          rowId={row.rowId}
        />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={paSDAgesAbbr}
          name="age"
          value={row.age}
          rowId={row.rowId}
        />
      </td>
      {paSDDanceStyles.map((danceStyle) => (
        <Division
          key={Object.getOwnPropertyNames(danceStyle)[0]}
          division={Object.values(danceStyle)[0]}
          danceStyle={Object.getOwnPropertyNames(danceStyle)[0]}
          rowId={row.rowId}
          categories={row.categories}
        />
      ))}
      <td
        className="position-relative"
        style={{ border: "1px solid black", verticalAlign: "middle" }}
      >
        {dances}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>supprimer la rangée</strong>
            </Tooltip>
          }
        >
          <div
            type="button"
            onClick={() => handleDeleteRow(row.rowId)}
            className="position-absolute top-0 end-0 delete-btn d-print-none"
          >
            <span>x</span>
          </div>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.shape({
    rowId: PropTypes.string,
    level: PropTypes.string,
    age: PropTypes.string,
    syllabus: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        dance: PropTypes.string,
        danceStyle: PropTypes.string,
      })
    ),
  }),
};

TableRow.defaultProps = {
  row: {
    rowId: "",
    level: "",
    age: "",
    syllabus: "",
    categories: [],
  },
};

export default TableRow;
