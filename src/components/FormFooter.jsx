import React from "react";
import { disclaimer } from "../constants";

const FormFooter = () => {

  return (
    <div className="d-flex">
      <div style={{ flex: "70%" }}>
        <p style={{ fontSize: ".75rem", textAlign: "left" }}>{disclaimer}</p>
        <p style={{ fontSize: "1rem", textAlign: "left", fontWeight: "bold" }}>
          DATE LIMITE : 5 AOÛT 2023 - SVP REMPLIR LE BON DE COMMANDE
        </p>
      </div>
      <div
        className="d-flex flex-column justify-content-end"
        style={{ flex: "30%" }}
      >
        <p
          className="mb-4"
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "left",
            borderTop: "1px solid black",
          }}
        >
          Signature
        </p>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "left",
            borderTop: "1px solid black",
          }}
        >
          Signature
        </p>
      </div>
    </div>
  );
};

export default FormFooter;
