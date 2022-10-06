import React, { useState } from "react";
import { ContactsCollection } from "../api/Contacts.collection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Container, Row, Col, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactList = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const isLoading = useSubscribe("allContacts");
  const contacts = useFind(() => {
    return ContactsCollection.find({});
  });

  if (isLoading()) {
    return <h4>Loading ...</h4>;
  }

  const removeContact = (e, _id) => {
    e.preventDefault();
    Meteor.call("contacts.remove", { contactId: _id }, (errorResponse) => {
      if (errorResponse) {
        setErrorMsg(errorResponse.error);
      } else {
        setSuccessMsg("User deleted");
        setTimeout(() => {
          setSuccessMsg();
        }, 5000);
      }
    });
  };

  return (
    <>
      <Container className="mt-5">
        {errorMsg && <ErrorAlert message={errorMsg} />}
        {successMsg && <SuccessAlert message={successMsg} />}
        <Row className="d-flex mt-3">
          <Col className="text-center">
            <h3>Lista de contactos</h3>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>email</th>
                  <th>Número</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, idx) => (
                  <tr key={idx}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.number}</td>
                    <td className="text-center">
                      <Button
                        onClick={(e) => removeContact(e, contact._id)}
                        variant="danger"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
