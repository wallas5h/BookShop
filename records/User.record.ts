import type { Document, WithId } from 'mongodb';
import { ObjectId } from "mongodb";
import { BookRecord } from './book.record';
import { OrderRecord } from './order.record';


export interface UserEntity extends WithId<Document> {
  _id: ObjectId;
  mail: string;
  phone: string;
}

export class UserRecord implements UserEntity {

  _id: ObjectId;
  mail: string;
  password: string;
  phone: string;
  refToken: string;
  sesToken?: string | null;
  shoppingCard?: BookRecord[];
  orders?: OrderRecord[];
  wishList?: BookRecord[];

  constructor(obj: UserRecord) {
    const { _id, mail, phone, password, refToken, sesToken, shoppingCard, orders, wishList } = obj;

    if (!mail || typeof mail !== 'string' || mail.indexOf('@') === -1 || mail.length < 2) {
      throw new Error('Incorrect mail');
    }

    this._id = _id ?? new ObjectId();
    this.mail = mail;
    this.phone = phone;
    this.password = password;
    this.refToken = refToken;
    this.sesToken = sesToken ?? null;
    this.shoppingCard = shoppingCard ?? [];
    this.orders = orders ?? [];
    this.wishList = wishList ?? [];

  }


  // private _validation(obj: UserRecord) {
  //   const { mail, phone } = obj;

  //   if (!mail || typeof mail !== 'string' || mail.indexOf('@') === -1 || mail.length < 2) {
  //     throw new Error('Incorrect mail');
  //   }
  //   // if (!password || typeof password !== 'string' || password.length < 2) {
  //   //   throw new Error('Incorrect password');
  // }
  // if (!phone || typeof phone !== 'string' || phone.length < 9 || phone.length > 9) {
  //   throw new Error('Incorrect phone');
  // }
  // }


}