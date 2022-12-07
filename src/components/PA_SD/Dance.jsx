import React, { useState, useEffect, useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { isEqual } from "lodash";
import { FormsContext } from "../../App";
import { danceNames } from "../../constants";
import "./Dance.css";
import PropTypes from "prop-types";

const Dance = ({ dance, danceStyle, entryId, eol, categories, formId }) => {
  const { setForms } = useContext(FormsContext);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    const currObj = {
      dance,
      danceStyle,
    };
    for (const obj of categories) {
      if (isEqual(currObj, obj)) {
        setSelect(true);
        break;
      }
    }
  }, [categories, dance, danceStyle]);

  const handleClick = () => {
    const newSelect = !select;
    setSelect(newSelect);
    const comp = {
      dance,
      danceStyle,
    };
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              entries: form.entries.map((entry) => {
                if (entry.entryId === entryId) {
                  const categories = newSelect
                    ? [...entry.categories, comp]
                    : entry.categories.filter(
                        (obj) =>
                          !(
                            obj.dance === comp.dance &&
                            obj.danceStyle === comp.danceStyle
                          )
                      );
                  return { ...entry, categories };
                } else return entry;
              }),
            }
          : form
      )
    );
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip>
          <strong>{danceNames[dance.toLowerCase()]}</strong>
        </Tooltip>
      }
    >
      <td
        className={`td-style ${eol && "border-R"} ${select && "under-bg"}`}
        onClick={handleClick}
      >
        {dance}
      </td>
    </OverlayTrigger>
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
