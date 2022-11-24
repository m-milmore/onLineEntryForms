import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormsContext } from "../App";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ConfirmationModal from "./Utils/ConfirmationModal";
import { appEmitter } from "../App";
import "./FormDisplay.css";

const FormDisplay = () => {
  const {forms} = useContext(FormsContext);
  const navigate = useNavigate();

  const [showConfModal, setShowConfModal] = useState(false);
  const [formId, setFormId] = useState("");

  const handleDelete = (event, formId) => {
    event.stopPropagation();
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
        {forms.map((form, i) => {
          const sommaire = form.formName === "Sommaire" ? true : false;
          return (
            <div key={form.formId} className="card-class" role="button">
              <Card
                bg={sommaire ? "info" : "primary"}
                text="white"
                style={{ width: "10rem", height: "7.5rem" }}
                onClick={() => clickToNavigate(form.navigate, form.formId, i)}
              >
                <Card.Body style={{ cursor: "pointer" }}>
                  <Card.Title>{i + 1 + ". " + form.formName}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      sommaire ? (
                        <></>
                      ) : (
                        <Tooltip>
                          <strong>supprimer ce formulaire</strong>
                        </Tooltip>
                      )
                    }
                  >
                    <i
                      className="m-1 fa-solid fa-circle-xmark"
                      style={{
                        cursor: "pointer",
                        color: sommaire ? "gray" : "black",
                        float: "right",
                        pointerEvents: sommaire ? "none" : "auto",
                      }}
                      onClick={(event) => handleDelete(event, form.formId)}
                    ></i>
                  </OverlayTrigger>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
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
