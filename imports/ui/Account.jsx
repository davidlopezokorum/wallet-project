import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { Button } from "@mui/material";

export const Account = () => {

  const wallet = {
    _id: "123456789",
    balance: 0,
    currency: "USD"
  }

  return (
    <>
      <Card className="m-5 p-3">
        <Container>
          <Row>
            <Col>
              <Row className="m-2 font-weight-light fs-4">Main account</Row>
              <Row className="m-2 font-weight-light fs-4">Wallet ID:</Row>
              <Row className="m-2">{wallet._id}</Row>
              <Row>
                <Col>
                  <Button variant="contained" >Agregar</Button>
                  <Button variant="contained" className="ml-3">Tranferir</Button>
                </Col>
              </Row>
            </Col>
            <Col className="text-center mx-auto">{wallet.balance} {wallet.currency}</Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};
