import React from "react";
import Dance from "./Dance";
import PropTypes from "prop-types";

const Division = ({ division, danceStyle, rowId }) => {
  return division.map((dance, i) => (
    <Dance
      key={dance}
      dance={dance}
      danceStyle={danceStyle}
			rowId={rowId}
      eol={i + 1 === division.length}
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
