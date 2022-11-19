import React from "react";
import "./SingleDances.css";
import SDTableHeader from "./SDTableHeader";
import TableRow from "./TableRow";
import SDTableFooter from "./SDTableFooter";
import PropTypes from "prop-types";

const SingleDances = ({ entries, syllabus, handleAddEntry }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 mb-1 table-print">
        <SDTableHeader syllabus={syllabus} />
        <tbody>
          {entries.map((entry) =>
            entry.syllabus === syllabus ? (
              <TableRow key={entry.entryId} entry={entry} />
            ) : null
          )}
        </tbody>
        <SDTableFooter syllabus={syllabus} handleAddEntry={handleAddEntry} />
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
  handleAddRow: () => {},
};

export default SingleDances;
