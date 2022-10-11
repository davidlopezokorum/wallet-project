import { WalletsCollection } from "../collections/WalletsCollection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "wallet.transaction"(args){
    const { _id, amount } = args;
    console.log("🚀 ~ file: WalletsMethods.js ~ line 7 ~ _id", _id)
    if(!_id){
      throw new Meteor.Error("Cuenta requerida.");
    } else if (!amount) {
      throw new Meteor.Error("Valor requerido.")
    }
    return WalletsCollection.update(_id,{$set: {balance:amount}});
  }
  //Proyeccions to bring only the data I want from the DB
})