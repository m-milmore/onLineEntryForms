import React, { useState, useEffect, useMemo } from "react";
import { isEqual } from "lodash";
import { appEmitter } from "../../App";
import "./Champ.css";

const ClosedChamp = ({ age, level, danceDiv, syllabus, entries }) => {
  const [selected, setSelected] = useState(false);
  const dance = danceDiv.split(" ")[1];
  const division = danceDiv.split(" ")[0];
  const entry = useMemo(
    () => ({
      age,
      level,
      dance,
      division,
      syllabus,
    }),
    [age, level, dance, division, syllabus]
  );

  useEffect(() => {
    for (const obj of entries) {
      if (isEqual(entry, obj)) {
        setSelected(true);
        break;
      }
    }
  }, [entries, entry]);

  const handleClick = () => {
    const newSelect = !selected;
    setSelected(newSelect);
    const currEntry = {
      ...entry,
      newSelect,
    };
    appEmitter.emit("paMulti", currEntry);
  };

  return (
    <td className="champ-cell" onClick={handleClick}>
      {selected ? "X" : ""}
    </td>
  );
};

export default ClosedChamp;
