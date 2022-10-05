import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';


export const App = () => (
  <div>
    <h1 className='text-light bg-secondary'>Meteor Wallet</h1>
    <ContactForm/>
    <ContactList/>
  </div>
);
