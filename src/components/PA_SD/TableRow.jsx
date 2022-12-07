import React, { useContext } from "react";
import { FormsContext } from "../../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RegSelect from "../Commons/RegSelect";
import Division from "./Division";
import {
  paSDDanceDivision,
  paSDLevelsClosed,
  paSDLevelsOpen,
  ageGroups,
} from "../../constants";
import "./TableRow.css";
import PropTypes from "prop-types";

const TableRow = ({ entry, formId }) => {
  const { setForms } = useContext(FormsContext);
  const { paSDAgeGroups } = ageGroups;
  const levels = entry.syllabus === "fermé" ? paSDLevelsClosed : paSDLevelsOpen;
  const dances = entry.categories.length;

  const handleDeleteEntry = () => {
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: form.entries.filter(
                (data) => data.entryId !== entry.entryId
              ),
            }
          : form
      )
    );
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={levels}
          name="level"
          value={entry.level}
          entryId={entry.entryId}
          formId={formId}
        />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={paSDAgeGroups}
          name="age"
          value={entry.age}
          entryId={entry.entryId}
          formId={formId}
        />
      </td>
      {paSDDanceDivision.map((danceStyle) => (
        <Division
          key={danceStyle[0]}
          division={danceStyle[1]}
          danceStyle={danceStyle[0]}
          entryId={entry.entryId}
          categories={entry.categories}
          formId={formId}
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
            onClick={handleDeleteEntry}
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
