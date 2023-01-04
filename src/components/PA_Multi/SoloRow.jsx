import React, { useContext } from "react";
import { FormsContext } from "../../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RegSelect from "../Commons/RegSelect";
import { paSDLevelsOpen, divisions } from "../../constants";

const SoloRow = ({ entry, formId }) => {
  const { setForms } = useContext(FormsContext);

  const handleSoloChange = ({ target: { value } }) => {
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: form.entries.map((data) =>
                data.entryId === entry.entryId
                  ? {
                      ...data,
                      dance: value,
                    }
                  : data
              ),
            }
          : form
      )
    );
  };

  const handleDeleteSolo = () => {
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: form.entries.filter(
                (data) => data.entryId !== entry.entryId
              ),
            }
          : form
      )
    );
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={paSDLevelsOpen}
          name="level"
          value={entry.level}
          entryId={entry.entryId}
          formId={formId}
        />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect
          options={divisions}
          name="danceStyle"
          value={entry.danceStyle}
          entryId={entry.entryId}
          formId={formId}
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control form-control-sm ps-0 pe-1 text-primary fw-bold border-0"
          value={entry.dance}
          onChange={handleSoloChange}
        />
      </td>
      <td style={{ border: "1px solid black", verticalAlign: "middle" }}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>supprimer le solo</strong>
            </Tooltip>
          }
        >
          <div
            type="button"
            onClick={handleDeleteSolo}
            className="d-print-none"
          >
            <i
              className="fa-solid fa-square-xmark fa-xl"
              style={{ color: "red", cursor: "pointer" }}
            ></i>
          </div>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default SoloRow;
