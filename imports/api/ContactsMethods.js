import { ContactsCollection } from "./Contacts.collection";
import { check } from 'meteor/check'

Meteor.methods({
  'contacts.insert'({ name, email, number }) {
    if(!name){
      throw new Meteor.Error("Nombre requerido.")
    }else if(!number){
      throw new Meteor.Error("Número requerido.")
    }
    return ContactsCollection.insert({ name, email, number });
  },
  'contacts.remove'({contactId}) {
    check(contactId,String);
    return ContactsCollection.remove(contactId);
  }
})
