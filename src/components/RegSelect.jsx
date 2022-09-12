import React from "react";
import "./RegSelect";
import PropTypes from "prop-types";

const RegSelect = ({ options, setState, name }) => {
  const handleSelect = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <select
      className="form-select form-select-sm px-1"
      onChange={handleSelect}
      aria-label="generic select"
    >
      <option>--</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

RegSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

RegSelect.defaultProps = {
  options: [],
};

export default RegSelect;
