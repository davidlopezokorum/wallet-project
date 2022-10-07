import { Meteor } from "meteor/meteor";
import "../imports/api/collections/Contacts.collection";
import "../imports/api/methods/ContactsMethods";
import "../imports/api/publications/ContactsPublications";
import "../imports/api/collections/TransactionCollection";
import "../imports/api/methods/TransactionsMethods";
import "../imports/api/publications/WalletsPublications";
import { WalletsCollection } from "../imports/api/collections/WalletsCollection";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      currency: "USD",
      balance: 0,
      createdAt: new Date(),
    });
  }
});
