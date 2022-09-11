import React from "react";

const AgeSection = () => {
  const colClass = "col text-nowrap flex-grow-0";

  return (
    <div className="fw-bold my-2 p-0" style={{fontSize: "11px"}}>
      <div className="row border border-dark m-0 py-1 px-0 justify-content-evenly">
        <div className={colClass}>ÂGE :</div>
        <div className={colClass}>(JV 11 -)</div>
        <div className={colClass}>(JR 12-15)</div>
        <div className={colClass}>(JE 16-18)</div>
        <div className={colClass}>(A 19 +)</div>
        <div className={colClass}>(B 30 +)</div>
        <div className={colClass}>(C 40 +)</div>
        <div className={colClass}>(D 50 +)</div>
        <div className={colClass}>(E 60 +)</div>
        <div className={colClass}>(F 70 +)</div>
      </div>
    </div>
  );
};

export default AgeSection;
