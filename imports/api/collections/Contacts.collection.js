import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

export const ContactsCollection = new Mongo.Collection('contacts');


const ContactSchema = new SimpleSchema({
  name:{
    type: String
  },
  email: {
    type: String,
    // regEx: SimpleSchema.RegEx.email,
    optional: true
  },
  number: {
    type: String
  },
  createdAt:{
    type: Date,
    optional: true
  }
});

ContactsCollection.attachSchema(ContactSchema);