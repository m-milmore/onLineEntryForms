import React, { useContext } from "react";
import { nanoid } from "nanoid";
import { FormsContext } from "../../App";

const SDTableFooter = ({ syllabus, formId }) => {
  const { setForms } = useContext(FormsContext);

  const handleAddEntry = () => {
    const newEntry = {
      entryId: nanoid(),
      level: "",
      age: "",
      syllabus: syllabus,
      category: "single",
      categories: [],
    };
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? { ...form, entries: [...form.entries, newEntry] }
          : form
      )
    );
  };

  return (
    <tfoot>
      <tr style={{ border: "1px solid white", textAlign: "left" }}>
        <td>
          <button
            type="button"
            className="btn btn-secondary py-0 px-1 m-0 d-print-none"
            onClick={handleAddEntry}
          >
            {syllabus} (+)
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

export default SDTableFooter;
