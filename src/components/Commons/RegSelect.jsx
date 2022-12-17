import React, { useContext } from "react";
import { FormsContext } from "../../App";
import "./RegSelect.css";
import PropTypes from "prop-types";

const RegSelect = ({ options, name, value, entryId, formId }) => {
  const { setForms } = useContext(FormsContext);

  const handleSelect = ({ target: { value } }) => {
    const isAge = name === "age";
    const ageTypeFound = options
      .filter((option) => option.split("|")[0] === value)[0]
      .split("|")[2];
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: form.entries.map((entry) =>
                entry.entryId === entryId
                  ? {
                      ...entry,
                      [name]: value,
                      ageType: isAge ? ageTypeFound : entry.ageType,
                    }
                  : entry
              ),
            }
          : form
      )
    );
  };

  return (
    <select
      className="form-select form-select-sm px-1 hover-fx"
      onChange={handleSelect}
      aria-label="generic select"
      value={value}
      name={name}
    >
      <option>--</option>
      {options.map((option) => (
        <option key={option.split("|")[0]} value={option.split("|")[0]}>
          {option.split("|")[0]}
        </option>
      ))}
    </select>
  );
};

RegSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
  rowId: PropTypes.string,
};

RegSelect.defaultProps = {
  options: [],
  name: "",
  value: "",
  rowId: "",
};

export default RegSelect;
