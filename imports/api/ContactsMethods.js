import { ContactsCollection } from "./Contacts.collection";

Meteor.methods({
  'contacts.insert'({ name, email, number }) {
    if(!name){
      throw new Meteor.Error("Name is required.")
    }else if(!email){
      throw new Meteor.Error("Email is required.")
    }else if(!number){
      throw new Meteor.Error("Number is required.")
    }
    return ContactsCollection.insert({ name, email, number });
  },
  'contacts.remove'({contactId}) {
    return ContactsCollection.remove(contactId);
  }
})
