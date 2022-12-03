import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { appEmitter } from "../../App";
import { provinces, states, provAbbr, statesAbbr } from "../../constants";
import PropTypes from "prop-types";

const BaseSelect = ({ label, value, options, dividers }) => {
  const handleClick = ({ target: { value } }) => {
    const countriesDivisions = provinces.concat(states);
    const countriesDivisionsAbbr = provAbbr.concat(statesAbbr);
    const stateAbbrev = countriesDivisions.includes(value)
      ? countriesDivisionsAbbr[countriesDivisions.indexOf(value)]
      : value;
    const territory = {
      territory: value,
      stateAbbrev,
    };
    appEmitter.emit("territory", territory);
  };

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
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ height: "32rem", overflowY: "scroll" }}>
          {options &&
            options.length &&
            options.map((option, i) => {
              return (
                <div key={option}>
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value={option}
                    onClick={handleClick}
                  >
                    {option}
                  </Dropdown.Item>
                  {dividers.includes(i) && <Dropdown.Divider />}
                </div>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

BaseSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  dividers: PropTypes.arrayOf(PropTypes.number),
};

BaseSelect.defaultProps = {
  label: "",
  value: "",
  options: [],
  dividers: [],
};

export default BaseSelect;
