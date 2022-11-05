import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = ({ show, handleClose, title, msg, handleConf }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConf}>
          Oui
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Non
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
