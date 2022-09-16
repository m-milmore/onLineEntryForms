import React from "react";
import "./FormHeader.css";
import { logo } from "../constants";

const FormHeader = () => {
  return (
    <div
      className="d-flex flex-column flex-lg-row mb-5 flex-wrap flex-lg-nowrap
    justify-content-center justify-content-md-between print-header"
    >
      <div
        className="d-flex flex-column align-items-center align-items-lg-start print-pa"
        style={{ color: "var(--ndcc-red)" }}
      >
        <div className="fs-4 fw-bold lh-sm text-decoration-underline">
          PRO-AM
        </div>
        <div className="fs-4 fw-bold lh-sm text-decoration-underline text-nowrap">
          DANSES INDIVIDUELLES
        </div>
      </div>
      <div className="d-flex flex-column align-items-center print-ndcc">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="fs-3 lh-sm text-center px-2 text-nowrap">
          Championnats Canadiens National
        </div>
      </div>
      <div className="ndcc-year-container print-year">
        <div className="fs-3 fw-bolder ndcc-year">2023</div>
        <div className="fs-4 fw-bolder text-nowrap ndcc-dates">
          25 26 27 AOÛT
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
