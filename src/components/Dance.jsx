import React, { useState } from "react";
import { appEmitter } from "../App";
import PropTypes from "prop-types";

const Dance = ({ dance, danceStyle, syllabus, eol }) => {
  const [select, setSelect] = useState(false);

  const handleClick = () => {
    const newSelect = !select;
    setSelect(newSelect);
    const comp = {
      dance,
      danceStyle,
      syllabus,
      newSelect,
    };
    appEmitter.emit("comp", comp);
  };

  return (
    <td
      style={{
        borderRight: eol ? "1px solid black" : "none",
        cursor: "pointer",
        textDecoration: select ? "underline" : "none",
        padding: "2px",
        verticalAlign: "middle",
      }}
      onClick={handleClick}
    >
      {dance}
    </td>
  );
};

Dance.propTypes = {
  dance: PropTypes.string,
  danceStyle: PropTypes.string,
  syllabus: PropTypes.string,
  eol: PropTypes.bool,
};

Dance.defaultProps = {
  dance: "",
  danceStyle: "",
  syllabus: "",
  eol: false,
};

export default Dance;
