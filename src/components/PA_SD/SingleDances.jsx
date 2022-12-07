import React, { useContext } from "react";
import { FormsContext } from "../../App";
import SDTableHeader from "./SDTableHeader";
import TableRow from "./TableRow";
import SDTableFooter from "./SDTableFooter";
import "./SingleDances.css";
import PropTypes from "prop-types";

const SingleDances = ({ syllabus, formId }) => {
  const { forms } = useContext(FormsContext);
  const currForm = forms.filter((form) => form.formId === formId);
  const entries = currForm[0].entries;

  return (
    <div className="table-responsive">
      <table className="table table-sm fs-6 mb-1 table-print">
        <SDTableHeader syllabus={syllabus} />
        <tbody>
          {entries.map((entry) =>
            entry.syllabus === syllabus ? (
              <TableRow key={entry.entryId} entry={entry} formId={formId}/>
            ) : null
          )}
        </tbody>
        <SDTableFooter syllabus={syllabus} formId={formId} />
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
