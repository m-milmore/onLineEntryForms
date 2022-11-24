import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const SubmittableIcons = ({ submittable }) => {
  return submittable ? (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          <strong>formulaire soumissible</strong>
        </Tooltip>
      }
    >
      <div style={{ paddingBottom: "2px" }}>
        <i
          className="fa-solid fa-square-check fa-xl me-2"
          style={{ color: "blue", cursor: "pointer" }}
        ></i>
      </div>
    </OverlayTrigger>
  ) : (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          <strong>formulaire incomplet</strong>
        </Tooltip>
      }
    >
      <div style={{ paddingBottom: "2px" }}>
        <i
          className="fa-solid fa-square-xmark fa-xl me-2"
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      </div>
    </OverlayTrigger>
  );
};

export default SubmittableIcons;
