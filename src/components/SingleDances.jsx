import React from "react";
import "./SingleDances.css";
import TableRow from "./TableRow";
import PropTypes from "prop-types";

const SingleDances = ({ rows, syllabus, handleAddRow }) => {
  const transformSyllabus = syllabus.toUpperCase();

  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 mb-1 table-print">
        <thead>
          <tr>
            <th scope="col" style={{ paddingRight: "50px" }}>
              NIVEAU
            </th>
            <th scope="col" style={{ paddingRight: "25px" }}>
              ÂGE
            </th>
            <th scope="col" colSpan="5" style={{ width: "12%" }}>
              SMOOTH {transformSyllabus}
            </th>
            <th scope="col" colSpan="15">
              RHYTHM {transformSyllabus}
            </th>
            <th
              scope="col"
              colSpan="5"
              style={{ width: "12%", letterSpacing: "-1px" }}
            >
              BALLROOM {transformSyllabus}
            </th>
            <th scope="col" colSpan="5" style={{ width: "12%" }}>
              LATIN {transformSyllabus}
            </th>
            <th scope="col" style={{ width: "5%" }}>
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(
            (row) =>
              row.syllabus === syllabus && (
                <TableRow key={row.rowId} row={row} />
              )
          )}
        </tbody>
        <tfoot>
          <tr style={{ border: "1px solid white", textAlign: "left" }}>
            <td>
              <button
                type="button"
                className="btn btn-secondary py-0 px-1 m-0 d-print-none"
								onClick={() => handleAddRow(syllabus)}
              >
                {syllabus} (+)
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

SingleDances.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  syllabus: PropTypes.string,
	handleAddRow: PropTypes.func,
};

SingleDances.defaultProps = {
  rows: [],
  syllabus: "",
	handleAddRow: () => {}
};

export default SingleDances;
