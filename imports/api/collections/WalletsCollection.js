import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

export const WalletsCollection = new Mongo.Collection('wallets');

const WalletSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
  },
  currency: {
    type: String,
    allowedValues: ["USD", "EUR"],
  },
  createdAt: {
    type: Date,
  },
});

WalletsCollection.attachSchema(WalletSchema);