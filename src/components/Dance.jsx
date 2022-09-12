import React, { useState } from "react";
import { appEmitter } from "../App";

const Dance = ({ dance, danceStyle, syllabus, eol }) => {
  const [select, setSelect] = useState(false);

  const handleClick = () => {
		const newSelect = !select
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
      }}
      onClick={handleClick}
    >
      {dance}
    </td>
  );
};

export default Dance;
