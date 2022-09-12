import React from "react";
import "./SingleDances.css";
import TableRow from "./TableRow";
import PropTypes from "prop-types";

const SingleDances = ({ syllabus }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 table-print">
        <thead>
          <tr>
            <th scope="col" style={{ paddingRight: "50px" }}>
              NIVEAU
            </th>
            <th scope="col" style={{ paddingRight: "25px" }}>
              ÂGE
            </th>
            <th scope="col" colSpan="5" style={{ width: "12%" }}>
              SMOOTH {syllabus}
            </th>
            <th scope="col" colSpan="15">
              RHYTHM {syllabus}
            </th>
            <th scope="col" colSpan="5" style={{ width: "12%" }}>
              BALLROOM {syllabus}
            </th>
            <th scope="col" colSpan="5" style={{ width: "12%" }}>
              LATIN {syllabus}
            </th>
            <th scope="col" style={{ width: "5%" }}>
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow syllabus={syllabus} />
        </tbody>
      </table>
    </div>
  );
};

SingleDances.propTypes = {
  syllabus: PropTypes.string,
};

SingleDances.defaultProps = {
  syllabus: "",
};

export default SingleDances;
