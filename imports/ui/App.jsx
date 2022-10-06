import React from "react";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";
import { Account } from "./Account";

export const App = () => (
  <div>
    <div className="d-flex align-items-center" style={{ backgroundColor: "#6600CC" }}>
      <h2 className="m-4 text-light text-center">Neky</h2>
    </div>
    <Account/>
    <ContactForm />
    <ContactList />
  </div>
);
