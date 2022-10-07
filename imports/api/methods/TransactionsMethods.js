import { TransactionCollection } from "../collections/TransactionCollection";
import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "transactions.insert"(args) {
    const schema = new SimpleSchema({
      isTransfering: {
        type: Boolean,
      },
      sourceWalletId: {
        type: String,
      },
      destinationWalletId: {
        type: String,
        optional: !args.isTransfering,
      },
      amount: {
        type: Number,
        min: 1,
      },
    });
    const { isTransfering, sourceWalletId, destinationWalletId, amount } =
      args;

    if (!sourceWalletId) {
      throw new Meteor.Error("Cuenta fuente requerida.");
    }
    if (isTransfering && !destinationWalletId) {
      throw new Meteor.Error("Cuenta destino requerida.");
    }
    if (!amount || amount <= 0) {
      throw new Meteor.Error("Monto requerido.");
    }
    const cleanTx = schema.clean(args);
    schema.validate(cleanTx);
    console.log(cleanTx);
    return TransactionCollection.insert({
      type: isTransfering ? "TRANSFER" : "ADD",
      sourceWalletId,
      destinationWalletId: isTransfering ? destinationWalletId : null,
      amount,
      createdAt: new Date(),
    });
  },
});
