import React from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

export const ModalWallet = ({ sendmoney, ...props }) => {

  const buttonActions = () => {
    props.onHide();
    sendmoney();
  }

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
          disabled={props.contacts === '1' ? true : false}
          variant="contained"
          onClick={buttonActions}
        >
          {props.footer}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
