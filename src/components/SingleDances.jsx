import React from "react";
import "./SingleDances.css";
import TableRow from "./TableRow";

const SingleDances = ({syllabus}) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 table-print">
        <thead>
          <tr>
            <th scope="col">NIVEAU</th>
            <th scope="col">ÂGE</th>
            <th scope="col" colSpan="5">
              SMOOTH {syllabus}
            </th>
            <th scope="col" colSpan="13">
              RHYTHM {syllabus}
            </th>
            <th scope="col" colSpan="5">
              BALLROOM {syllabus}
            </th>
            <th scope="col" colSpan="5">
              LATIN {syllabus}
            </th>
            <th scope="col">DANSE TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <TableRow syllabus={syllabus}/>
        </tbody>
      </table>
    </div>
  );
};

export default SingleDances;
