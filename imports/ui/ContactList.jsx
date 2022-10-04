import React from "react";
import { ContactsCollection } from "../api/Contacts.collection";
import { useTracker } from "meteor/react-meteor-data";

export const ContactList = () => {
  const contact = useTracker(() => {
    return ContactsCollection.find({}).fetch();
  });

  return (
    <>
      <h3>List contacts</h3>
      <ol>
        {contact.map((contact, idx) => (
          <li key={idx}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ol>
    </>
  );
};
