import React, { useState } from "react";
import "./Dance.css";
import { appEmitter } from "../App";
import PropTypes from "prop-types";

const Dance = ({ dance, danceStyle, rowId, eol }) => {
  const [select, setSelect] = useState(false);

  const handleClick = () => {
    const newSelect = !select;
    setSelect(newSelect);
    const comp = {
      dance,
      danceStyle,
      rowId,
      newSelect,
    };
    appEmitter.emit("comp", comp);
  };

  return (
    <td
      className={`td-style ${eol && "border-R"} ${select && "under-bg"}`}
      onClick={handleClick}
    >
      {dance}
    </td>
  );
};

Dance.propTypes = {
  dance: PropTypes.string,
  danceStyle: PropTypes.string,
  rowId: PropTypes.string,
  eol: PropTypes.bool,
};

Dance.defaultProps = {
  dance: "",
  danceStyle: "",
  rowId: "",
  eol: false,
};

export default Dance;
