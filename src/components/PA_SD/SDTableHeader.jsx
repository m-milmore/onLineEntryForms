import React from "react";
import { paSDDanceDivision } from "../../constants";

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
        {paSDDanceDivision.map((style) => (
          <th
            key={style[0]}
            scope="col"
            colSpan={style[1].length}
            className={style[0] !== "rhythm" ? "dance-division" : null}
          >
            {style[0].toUpperCase()}
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
