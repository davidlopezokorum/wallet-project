import React from "react";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";

export const App = () => (
  <div>
    <div className="d-flex align-items" style={{ backgroundColor: "#6600CC" }}>
      <h2 className="text-light text-center">Meteor Wallet</h2>
    </div>
    <ContactForm />
    <ContactList />
  </div>
);
