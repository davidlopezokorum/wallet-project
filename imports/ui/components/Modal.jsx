import React from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

export const ModalWallet = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          onClick={props.onHide}
        >
          {props.footer}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
