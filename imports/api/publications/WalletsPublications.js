import { WalletsCollection } from "../collections/WalletsCollection"
import { Meteor } from "meteor/meteor";

Meteor.publish('wallets',function publishWallets () {
  return WalletsCollection.find(); //Live query
})