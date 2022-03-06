import { ObjectId } from "mongodb";
import { newsletterMailList } from "../utils/db";


export class NewsletterRecord {

  _id?: ObjectId
  mail: string

  constructor(obj: NewsletterRecord) {
    this.mail = obj.mail;
    this._id = new ObjectId(obj._id);
  }

  static async findOne(mail: string) {
    const item = await newsletterMailList.findOne({ "mail": mail });
    return item === null ? false : true;
  }

  static async findAll() {
    return (await newsletterMailList.find()).toArray();
  }
  static async insertOne(mail: string) {
    const { insertedId } = await newsletterMailList.insertOne({
      "mail": mail
    })
    return insertedId;
  }
}