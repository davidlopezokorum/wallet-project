import { ContactsCollection } from "../collections/Contacts.collection";
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor';

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
  },
  'contact.findById'({ id }){
    return ContactsCollection.findOne({ _id: id });
  }
})
