import React from "react";
import "./TableRow.css";
import RegSelect from "./RegSelect";
import Division from "./Division";
import { levels, ages, smooth, rhythm, ballroom, latin } from "../constants";
import { appEmitter } from "../App";
import PropTypes from "prop-types";

const TableRow = ({ row }) => {
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
          options={ages}
          name="age"
          value={row.age}
          rowId={row.rowId}
        />
      </td>
      <Division division={smooth} danceStyle="smooth" rowId={row.rowId} />
      <Division division={rhythm} danceStyle="rhythm" rowId={row.rowId} />
      <Division division={ballroom} danceStyle="ballroom" rowId={row.rowId} />
      <Division division={latin} danceStyle="latin" rowId={row.rowId} />
      <td
        className="position-relative"
        style={{ border: "1px solid black", verticalAlign: "middle" }}
      >
        {dances}
        <div
          type="button"
          onClick={() => handleDeleteRow(row.rowId)}
          className="position-absolute top-0 end-0 delete-btn d-print-none"
        >
          x
        </div>
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
