import { ObjectId } from "mongodb";
import { usersRegistered } from "../utils/db";
import { UserRecord } from "./User.record";


export class UserRepository {

  static async createUser(record: UserRecord) {
    await usersRegistered.insertOne(record)
  }

  static async updateUser(record: UserRecord) {
    await usersRegistered.replaceOne({ "_id": new ObjectId(record._id) }, record)
  }

  static async findOne(mail: string) {
    const item = ((await usersRegistered.findOne({ "mail": mail }))) as UserRecord
    return item === null ? null : new UserRecord(item)
  }

  static async updateSesionToken(mail: string, data: string | null) {
    usersRegistered.updateOne({ "mail": mail }, {
      $set: {
        "sesToken": data
      }
    })
  }

  static async deleteSesionToken(mail: string) {
    usersRegistered.updateOne({ "mail": mail }, {
      $unset: {
        "sesToken": ""
      }
    })
  }

  static async deleteProductFromShoppingCard(record: UserRecord, product) {

    const user = (await usersRegistered.findOne({ "_id": new ObjectId(record._id) })) as UserRecord;
    const shoppingCard = user.shoppingCard;
    const newShoppingCard = shoppingCard.filter((item) => {
      return item.title !== product.title
    });

    await usersRegistered.updateOne({ "_id": user._id }, {
      $set: {
        "shoppingCard": newShoppingCard
      }
    })
  }

  static async deleteProductFromWishList(record: UserRecord, product) {

    const user = (await usersRegistered.findOne({ "_id": new ObjectId(record._id) })) as UserRecord;
    const wishList = user.wishList;
    const newWishList = wishList.filter((item) => {
      return item.title !== product.title
    });

    console.log(newWishList)
    await usersRegistered.updateOne({ "_id": user._id }, {
      $set: {
        "wishList": newWishList
      }
    })
  }

  static async sumCountShoppingCard(record: UserRecord) {

    const user = (await usersRegistered.findOne({ "_id": new ObjectId(record._id) })) as UserRecord;
    const shoppingCard = user.shoppingCard;
    return shoppingCard.reduce((prev, current) => {
      return prev + current.newPrice
    }, 0);

  }



}