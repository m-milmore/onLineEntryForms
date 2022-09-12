import React from "react";
import Dance from "./Dance";

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

export default Division;
