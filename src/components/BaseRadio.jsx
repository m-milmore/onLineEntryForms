import React from "react";
import PropTypes from "prop-types";

const BaseRadio = ({ commonInfo, name, handleChange, label }) => {
  // commonInfo: male | female; name: studentGender; label: Homme | Femme (en français, faire une version bilingue)
  return (
    <>
      <label className="form-check-label" htmlFor={commonInfo}>
        {label}
      </label>
      <input
        type="radio"
        className="form-check-input"
        id={commonInfo}
        name={name}
        value={commonInfo}
        onChange={handleChange}
      />
    </>
  );
};

BaseRadio.propTypes = {
  commonInfo: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
};

BaseRadio.defaultProps = {
  commonInfo: "",
  name: "",
  handleChange: () => {},
  label: "",
};

export default BaseRadio;
