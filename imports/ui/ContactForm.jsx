import React, { useState } from "react";
import { Button } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Meteor } from "meteor/meteor";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError();
    }, 5000);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage();
    }, 5000);
  };

  const saveContact = (e) => {
    e.preventDefault();
    console.log({ name, email, number });
    Meteor.call("contacts.insert", { name, email, number }, (errorResponse) => {
      if (errorResponse) {
        showError(errorResponse.error);
      } else {
        setName();
        setEmail();
        setNumber();
        setError();
        showSuccess("Contact saved");
      }
    });
  };

  return (
    <Container className="mt-4">
      <form>
        {error && <ErrorAlert message={error} />}
        {successMessage && <SuccessAlert message={successMessage} />}
        <Row className="mt-4">
          <Col>
            <label htmlFor="name">Name:</label>
            <input
              className="rounded ml-2"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <label htmlFor="email">Email:</label>
            <input
              className="rounded ml-2"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <label htmlFor="number">Number:</label>
            <input
              className="rounded ml-2"
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3 d-flex">
          <Col className="text-center">
            <Button
              variant="contained"
              type="submit"
              onClick={(e) => saveContact(e)}
            >
              Guardar contacto
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};
