import React, { useState } from "react";
import { ContactsCollection } from "../api/Contacts.collection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactList = () => {

  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const isLoading = useSubscribe('allContacts');
  const contacts = useFind(() => {
    return ContactsCollection.find({}); 
  });

  if(isLoading()){
    return <h4>Loading ...</h4>
  }

  const removeContact = (e,_id) => {
    e.preventDefault();
    Meteor.call('contacts.remove', {contactId: _id}, (errorResponse) => {
      if(errorResponse){
        setErrorMsg(errorResponse.error);
      }else{
        setSuccessMsg("User deleted");
        setTimeout(() => {
          setSuccessMsg();
        }, 5000)
      }
    });
  }

  return (
    <>
      <Container className="mt-3">
        {errorMsg && <ErrorAlert message={errorMsg}/>}
        {successMsg && <SuccessAlert message={successMsg}/>}
        <Row className="d-flex">
          <Col>
            <h3 className="ml-3">List contacts</h3>
            <ol>
              {contacts.map((contact, idx) => (
                <li key={idx}>
                  {contact.name} - {contact.email} - {contact.number}
                  <Button onClick={(e) => removeContact(e,contact._id)} className="ml-3" variant="danger">
                    Remove
                  </Button>
                </li>
              ))}
            </ol>
          </Col>
        </Row>
      </Container>
    </>
  );
};
