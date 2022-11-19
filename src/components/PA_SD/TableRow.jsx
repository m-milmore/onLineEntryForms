import React from "react";
import { appEmitter } from "../../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RegSelect from "./RegSelect";
import Division from "./Division";
import {
  paSDDanceStyles,
  paSDLevelsClosed,
  paSDLevelsOpen,
  ageGroups,
} from "../../constants";
import "./TableRow.css";
import PropTypes from "prop-types";

const TableRow = ({ entry }) => {
  const { paSDAges } = ageGroups;
  const levels = entry.syllabus === "fermé" ? paSDLevelsClosed : paSDLevelsOpen;
  const dances = entry.categories.length;

  const handleDeleteEntry = (entryId) => {
    const entryToDelete = {
      entryId,
    };
    appEmitter.emit("deleteEntry", entryToDelete);
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={levels}
          name="level"
          value={entry.level}
          entryId={entry.entryId}
        />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={paSDAges}
          name="age"
          value={entry.age}
          entryId={entry.entryId}
        />
      </td>
      {paSDDanceStyles.map((danceStyle) => (
        <Division
          key={Object.getOwnPropertyNames(danceStyle)[0]}
          division={Object.values(danceStyle)[0]}
          danceStyle={Object.getOwnPropertyNames(danceStyle)[0]}
          entryId={entry.entryId}
          categories={entry.categories}
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
            onClick={() => handleDeleteEntry(entry.entryId)}
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
