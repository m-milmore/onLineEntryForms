import React from "react";

const ScholTitle = () => {
  return (
    <div className="text-uppercase fs-5 fw-bold text-start">
      <div className="d-flex justify-content-between">
        <u>championnats canadiens pro-am Bourses d'étude</u>
        <span className="me-3 text-center text-md-start">
          10 danses individuelles requises
        </span>
      </div>
      <div className="text-center">
        <span
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: "3px",
            padding: "0 5px",
          }}
        >
          ouvert aux compétiteurs du canada seulement
        </span>
      </div>
    </div>
  );
};

export default ScholTitle;
