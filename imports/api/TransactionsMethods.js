import { TransactionCollection } from "./TransactionCollection";
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'transactions.insert'({ isTransfering, sourceWalletId, destinationWalletId, amount }) {
    check(isTransfering, Boolean);
    check(sourceWalletId, String);
    check(destinationWalletId, String);
    check(amount, Number);
    if(!sourceWalletId){
      throw new Meteor.Error("Cuenta fuente requerida.")
    }
    if( isTransfering && !destinationWalletId){
      throw new Meteor.Error("Cuenta destino requerida.")
    }
    if(!amount || amount <= 0){
      throw new Meteor.Error("Monto requerido.")
    }
    return TransactionCollection.insert({
      type: isTransfering ? 'TRANFER' : 'ADD',
      sourceWalletId,
      destinationWalletId: isTransfering ? destinationWalletId : null,
      amount,
      createdAt: new Date()
    });
  }
})
