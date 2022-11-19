import React from "react";
import Dance from "./Dance";
import PropTypes from "prop-types";

const Division = ({ division, danceStyle, entryId, categories }) => {
  return division.map((dance, i) => (
    <Dance
      key={dance}
      dance={dance}
      danceStyle={danceStyle}
      entryId={entryId}
      eol={i + 1 === division.length}
      categories={categories}
    />
  ));
};

Division.propTypes = {
  division: PropTypes.arrayOf(PropTypes.string),
  danceStyle: PropTypes.string,
  rowId: PropTypes.string,
};

Division.defaultProps = {
  division: [],
  danceStyle: "",
  rowId: "",
};

export default Division;
