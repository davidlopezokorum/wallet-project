import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

export const TransactionCollection = new Mongo.Collection('transactions');

const TransactionSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['TRANSFER','ADD']
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true
  },
  amount:{
    type: Number,
    min: [1, "El valor debe ser mayor"]
  }
});

TransactionCollection.attachSchema(TransactionSchema);