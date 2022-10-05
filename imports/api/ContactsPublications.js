import { ContactsCollection } from "./Contacts.collection"
import { Meteor } from "meteor/meteor";

Meteor.publish('allContacts',function publishAllContacts () {
  return ContactsCollection.find(); //Live query
})