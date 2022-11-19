import React from "react"

const SDTableFooter = ({ syllabus, handleAddRow }) => {
  return (
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
  );
};

export default SDTableFooter