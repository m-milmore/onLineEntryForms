import React, { useContext } from "react";
import { FormsContext } from "../../App";
import { nanoid } from "nanoid";

const SoloTableFooter = ({ formId }) => {
  const { setForms } = useContext(FormsContext);

  const handleAddSolo = () => {
    const newEntry = {
      entryId: nanoid(),
      level: "",
      age: "All",
      syllabus: "open",
      category: "solo",
      dance: "",
      danceStyle: "",
    };
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: [...form.entries, newEntry],
            }
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
            onClick={handleAddSolo}
          >
            Solo (+)
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

export default SoloTableFooter;
