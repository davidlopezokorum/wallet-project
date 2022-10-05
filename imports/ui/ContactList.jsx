import React from "react";
import { ContactsCollection } from "../api/Contacts.collection";
import { useTracker } from "meteor/react-meteor-data";
import { Container, Row, Col } from "react-bootstrap";

export const ContactList = () => {
  const contact = useTracker(() => {
    return ContactsCollection.find({}).fetch();
  });

  return (
    <>
      <Container>
        <Row className="d-flex">
          <Col>
            <h3 className="ml-3">List contacts</h3>
            <ol>
              {contact.map((contact, idx) => (
                <li key={idx}>
                  {contact.name} - {contact.email} - {contact.number}
                </li>
              ))}
            </ol>
          </Col>
        </Row>
      </Container>
    </>
  );
};
