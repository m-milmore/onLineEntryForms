import React from "react";
import PropTypes from "prop-types";

const RegSelect = ({ options, setState, name, value }) => {
  return (
    <select
      className="form-select form-select-sm px-1"
      onChange={setState}
      aria-label="generic select"
      value={value}
      name={name}
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
  setState: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};

RegSelect.defaultProps = {
  options: [],
  setState: () => {},
  name: "",
  value: "",
};

export default RegSelect;
