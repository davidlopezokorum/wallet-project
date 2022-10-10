import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { WalletsCollection } from "./WalletsCollection";
class TransactionMongoCollection extends Mongo.Collection {
  insert(transactionDocument, callback) {
    if (transactionDocument.type === "TRANSFER") {
      const sourceWallet = WalletsCollection.findOne(
        transactionDocument.sourceWalletId
      );
      if (!sourceWallet) {
        throw new Meteor.Error("Billetera fuente no encontrada.");
      }
      if (sourceWallet.balance < transactionDocument.amount) {
        throw new Meteor.Error("No tienes fondos suficientes.");
      }
      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: { balance: -transactionDocument.amount },
      });
    }
    if (transactionDocument.type === "ADD") {
      const sourceWallet = WalletsCollection.findOne(
        transactionDocument.sourceWalletId
      );
      if (!sourceWallet) {
        throw new Meteor.Error("Billetera fuente no encontrada.");
      }
      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: { balance: transactionDocument.amount },
      });
    }
    return super.insert(transactionDocument, callback);
  }
}

export const TransactionCollection = new TransactionMongoCollection(
  'transactions'
);


const TransactionSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ["TRANSFER", "ADD"],
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    min: [1, "El valor debe ser mayor"],
  },
});

TransactionCollection.attachSchema(TransactionSchema);
