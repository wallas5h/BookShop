import type { Document, WithId } from 'mongodb';
import { ObjectId } from "mongodb";


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

  constructor(obj: UserRecord) {
    const { _id, mail, phone, password } = obj;
    this._validation(obj);

    this._id = _id ?? new ObjectId();
    this.mail = mail;
    this.phone = phone;
    this.password = password;
  }
  private _validation(obj: UserRecord) {
    const { mail, phone, password } = obj;

    if (!mail || typeof mail !== 'string' || mail.indexOf('@') === -1 || mail.length < 2) {
      throw new Error('Incorrect mail');
    }
    if (!password || typeof password !== 'string' || password.length < 2) {
      throw new Error('Incorrect password');
    }
    // if (!phone || typeof phone !== 'string' || phone.length < 9 || phone.length > 9) {
    //   throw new Error('Incorrect phone');
    // }

  }

}