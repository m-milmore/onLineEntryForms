import React, { useContext } from "react";
import { appEmitter, UserContext } from "../../App";
import "./TableRow.css";
import RegSelect from "./RegSelect";
import Division from "./Division";
import PropTypes from "prop-types";

const TableRow = ({ row }) => {
  const { entriesService } = useContext(UserContext);
  const { levels, ages, smooth, rhythm, ballroom, latin, danceStyles } =
    entriesService.formConstants;
  const dances = row.categories.length;
  const arrObj = {
    smooth,
    rhythm,
    ballroom,
    latin,
  };

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
      {danceStyles.map((danceStyle) => (
        <Division
          key={danceStyle}
          division={arrObj[danceStyle]}
          danceStyle={danceStyle}
          rowId={row.rowId}
          categories={row.categories}
        />
      ))}
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
