import React from "react";
import PropTypes from "prop-types";

const BaseText = ({
  inputType,
  commonInfo,
  inputValue,
  handleChange,
  label,
}) => {
  // commonInfo is for id, name & htmlFor, example "studio"
  return (
    <div
      className="d-flex align-items-center flex-xs-nowrap flex-sm-wrap flex-md-nowrap justify-content-start mb-1"
      style={{ width: "100%" }}
    >
      <label
        className="label-id-section text-nowrap"
        htmlFor={commonInfo}
      >
        {label}
      </label>
      <input
        type={inputType}
        className="form-control form-control-sm ps-0 pe-1 text-primary fw-bold"
        id={commonInfo}
        name={commonInfo}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

BaseText.propTypes = {
  inputType: PropTypes.string,
  commonInfo: PropTypes.string,
  inputValue: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
};

BaseText.defaultProps = {
  inputType: "text",
  commonInfo: "",
  inputValue: "",
  handleChange: () => {},
  label: "",
};

export default BaseText;
