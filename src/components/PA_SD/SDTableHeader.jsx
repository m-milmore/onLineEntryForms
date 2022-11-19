import React from "react";
import { paSDDanceStyles } from "../../constants";

const SDTableHeader = ({ syllabus }) => {
  const transformSyllabus = syllabus.toUpperCase();

  return (
    <thead>
      <tr>
        <th scope="col" className="level-class">
          NIVEAU
        </th>
        <th scope="col" className="ages-class">
          ÂGE
        </th>
        {paSDDanceStyles.map((style, i) => (
          <th
            key={Object.getOwnPropertyNames(style)[0]}
            scope="col"
            colSpan={Object.values(style)[0].length}
            className={
              Object.getOwnPropertyNames(style)[0] !== "rhythm"
                ? "dance-division"
                : null
            }
          >
            {Object.getOwnPropertyNames(style)[0].toUpperCase()}
            <br className="br-class" /> {transformSyllabus}
          </th>
        ))}
        <th scope="col" style={{ width: "5%" }}>
          TOTAL
        </th>
      </tr>
    </thead>
  );
};

export default SDTableHeader;
