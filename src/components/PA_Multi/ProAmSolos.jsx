import React from "react";

const ProAmSolos = ({ solos, handleSolos }) => {
  return (
    <>
      <div className="text-start">
        <span className="text-uppercase fs-4 fw-bold text-decoration-underline">
          démonstration solo
        </span>
        <span className="fs-5"> - Indiquez le niveau et la danse</span>
      </div>
      <textarea
        className="fs-6"
        value={solos}
        onChange={handleSolos}
        style={{ width: "100%", resize: "none" }}
      />
    </>
  );
};

export default ProAmSolos;
