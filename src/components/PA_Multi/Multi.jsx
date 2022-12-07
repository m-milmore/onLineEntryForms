import React, { useState, useEffect, useMemo, useContext } from "react";
import { FormsContext } from "../../App";
import { isEqual } from "lodash";
import "./Multi.css";

const Multi = ({
  age,
  level,
  danceDiv,
  syllabus,
  category,
  entries,
  formId,
}) => {
  const { setForms } = useContext(FormsContext);
  const [selected, setSelected] = useState(false);
  const danceStyle = danceDiv.split(" ")[0];
  const dance = danceDiv.split(" ")[1];

  const entry = useMemo(
    () => ({
      age,
      level,
      dance,
      danceStyle,
      syllabus,
      category,
    }),
    [age, level, dance, danceStyle, syllabus, category]
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

    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: newSelect
                ? [...form.entries, entry]
                : form.entries.filter((obj) => !isEqual(obj, entry)),
            }
          : form
      )
    );
  };

  return (
    <td className="champ-cell" onClick={handleClick}>
      {selected ? "X" : ""}
    </td>
  );
};

export default Multi;
