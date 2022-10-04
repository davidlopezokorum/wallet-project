import React, { useState } from "react";
import { ContactsCollection } from "../api/Contacts.collection";

export const ContactForm = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  const saveContact = (e) => {
    e.preventDefault();
    console.log({name,email,number})
    ContactsCollection.insert({name,email,number})
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="number">Number:</label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => saveContact(e)}>
          Save contact
        </button>
      </div>
    </form>
  );
};
