import React from "react";
import { ageGroups } from "../../constants";
import "./AgeSection.css";

const AgeSection = () => {
  const { paSDAges } = ageGroups;
  const colClass = "col text-nowrap flex-grow-0 age-class";

  return (
    <div className="fw-bold my-2 p-0">
      <div className="row flex-md-nowrap border border-dark m-0 py-1 px-0 justify-content-evenly">
        <div className={colClass}>ÂGE :</div>
        {paSDAges.map((age) => (
          <div key={age.split("|")[1]} className={colClass}>
            {age.split("|")[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeSection;
