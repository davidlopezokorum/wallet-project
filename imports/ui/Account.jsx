import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Button } from "@mui/material";
import { ModalWallet } from "./components/Modal";

export const Account = () => {
  const wallet = {
    _id: "123456789",
    balance: 5,
    currency: "USD",
  };

  const [modalShow, setModalShow] = useState(false);
  const [isTranfering, setIsTranfering] = useState(false);
  const [amount, setAmount] = useState(0);

  return (
    <>
      <Card className="m-5 p-3">
        <Container>
          <Row>
            <Col>
              <Row className="m-2 font-weight-light fs-4">Cuenta principal</Row>
              <Row className="m-2 font-weight-light fs-4">Wallet ID:</Row>
              <Row className="m-2">{wallet._id}</Row>
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setIsTranfering(true);
                    }}
                    variant="contained"
                  >
                    Agregar
                  </Button>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setIsTranfering(false);
                    }}
                    variant="contained"
                    className="ml-3"
                  >
                    Tranferir
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="text-center mx-auto">
              {wallet.balance} {wallet.currency}
            </Col>
          </Row>
        </Container>
      </Card>

      <ModalWallet
        state={modalShow}
        show={modalShow}
        title={
          isTranfering
            ? "Tranferir dinero a mi billetera"
            : "Tranferir a un contacto"
        }
        body={
          <>
            {!isTranfering && (
              <div className="ml-4 mb-3">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Seleccionar contacto"
                  variant="secondary"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            )}
            <label className="ml-4" htmlFor="name">Valor:</label>
            <input
              className="rounded ml-2"
              type="number"
              id="numberAmount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </>
        }
        footer={isTranfering ? "Tranferir" : "Enviar"}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
