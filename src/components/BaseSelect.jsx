import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { canadaDivisions } from "../constants";

const BaseSelect = ({ label, title, options, name, handleChange }) => {
  return (
    <div
      className="d-flex align-items-center flex-wrap pb-1"
      style={{ width: "100%" }}
    >
      <label
        className="label-id-section d-none d-lg-block"
        style={{ cursor: "auto" }}
      >
        {label}
      </label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ height: "32rem", overflowY: "scroll" }}>
          {options && options.length && options.map((option, i) => {
            return (
              <div key={option}>
                <Dropdown.Item
                  as="button"
                  type="button"
                  name={name}
                  value={option}
                  onClick={handleChange}
                >
                  {option}
                </Dropdown.Item>
                {i === canadaDivisions - 1 && <Dropdown.Divider />}
              </div>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

BaseSelect.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
};

BaseSelect.defaultProps = {
  name: "",
  handleChange: () => {},
  title: "Dropdown",
  options: [],
  label: "",
};

export default BaseSelect;
