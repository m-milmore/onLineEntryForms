import React from "react";
import "./RegSelect.css"
import { appEmitter } from "../App";
import PropTypes from "prop-types";

const RegSelect = ({ options, name, value, rowId}) => {
	const handleSelect = ({target: {value}}) => {
		const selected = {
			rowId,
			name,
			value,
		}
		appEmitter.emit("select", selected);
	}

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
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

RegSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
	rowId: PropTypes.string
};

RegSelect.defaultProps = {
  options: [],
  name: "",
  value: "",
	rowId: "",
};

export default RegSelect;
