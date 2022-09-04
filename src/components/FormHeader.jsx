import React from "react";
import { logo, dates } from "../constants";

const FormHeader = () => {
  return (
    <div className="d-flex mb-5 flex-wrap justify-content-center justify-content-md-between d-print-flex">
      <div className="d-flex flex-column align-items-center align-items-md-start">
        <div className="fs-4 fw-bold lh-sm text-decoration-underline">
          PRO-AM
        </div>
        <div className="fs-4 fw-bold lh-sm text-decoration-underline">
          DANSES INDIVIDUELLES
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div style={{ width: "100px" }}>
          <img src={logo} alt="logo" />
        </div>
        <div className="fs-3 lh-sm text-center px-2">
          Championnat Canadien National
        </div>
      </div>
      <div className="" style={{ maxWidth: "225px", minWidth: "150px" }}>
        <img src={dates} alt="dates" />
      </div>
    </div>
  );
};

export default FormHeader;
