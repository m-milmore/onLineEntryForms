import React from "react";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import AppMsg from "../Utils/AppMsg";

const FormsControls = ({ submittable, msg }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 d-print-none ">
      {submittable ? (
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>formulaire soumissible</strong>
            </Tooltip>
          }
        >
          <div style={{ paddingBottom: "2px" }}>
            <i
              className="fa-solid fa-square-check fa-xl"
              style={{ color: "blue", cursor: "pointer" }}
            ></i>
          </div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <strong>formulaire incomplet</strong>
            </Tooltip>
          }
        >
          <div style={{ paddingBottom: "2px" }}>
            <i
              className="fa-solid fa-square-xmark fa-xl"
              style={{ color: "red", cursor: "pointer" }}
            ></i>
          </div>
        </OverlayTrigger>
      )}
      <input
        className="btn btn-primary mx-2"
        type="button"
        value="Formulaires"
        onClick={() => navigate("/")}
      />
      <AppMsg msg={msg} />
    </div>
  );
};

export default FormsControls;
