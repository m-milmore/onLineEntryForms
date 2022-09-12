import React from "react";
import Dance from "./Dance";
import PropTypes from "prop-types";

const Division = ({ division, syllabus, danceStyle }) => {
  return division.map((dance, i) => (
    <Dance
      key={dance}
      dance={dance}
      danceStyle={danceStyle}
      syllabus={syllabus}
      eol={i + 1 === division.length}
    />
  ));
};

Division.propTypes = {
  division: PropTypes.arrayOf(PropTypes.string),
  syllabus: PropTypes.string,
  danceStyle: PropTypes.string,
};

Division.defaultProps = {
  division: [],
  syllabus: "",
  danceStyle: "",
};

export default Division;
