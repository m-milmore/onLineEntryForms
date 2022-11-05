import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ConfirmationModal from "./Utils/ConfirmationModal";
import { appEmitter } from "../App";
import "./FormDisplay.css";

const FormDisplay = ({ forms }) => {
  const navigate = useNavigate();

  const [showConfModal, setShowConfModal] = useState(false);
  const [formId, setFormId] = useState("");

  const handleDelete = (formId) => {
    setFormId(formId);
    setShowConfModal(true);
  };

  const handleConfOk = (formId) => {
    setShowConfModal(false);
    appEmitter.emit("deleteForm", formId);
  };

  const clickToNavigate = (navigateTo, formId, i) => {
    setTimeout(() => {
      navigate(navigateTo, {
        state: { formId, i },
      });
    }, 50);
  };

  return (
    <>
      <div className="fs-6 fw-bolder d-flex justify-content-start">
        {forms
          ? forms.length
            ? forms.map((form, i) => (
                <div key={form.formId} className="card-class" role="button">
                  <Card
                    bg="info"
                    text="white"
                    style={{ width: "10rem", height: "7.5rem" }}
                  >
                    <Card.Body
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        clickToNavigate(form.navigate, form.formId, i)
                      }
                    >
                      <Card.Title>{(i+1)+ ". "+form.formName}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <strong>supprimer ce formulaire</strong>
                          </Tooltip>
                        }
                      >
                        <i
                          className="m-1 fa-solid fa-circle-xmark"
                          style={{
                            cursor: "pointer",
                            color: "black",
                            float: "right",
                          }}
                          onClick={() => handleDelete(form.formId)}
                        ></i>
                      </OverlayTrigger>
                    </Card.Footer>
                  </Card>
                </div>
              ))
            : null
          : null}
      </div>
      <ConfirmationModal
        show={showConfModal}
        handleClose={() => setShowConfModal(false)}
        title="Suppression de formulaire"
        msg={"Est-vous bien sûr de vouloir supprimer ce formulaire?"}
        handleConf={() => handleConfOk(formId)}
      />
    </>
  );
};

export default FormDisplay;
