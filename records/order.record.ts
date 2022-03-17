import type { Document, WithId } from 'mongodb';
import { ObjectId } from "mongodb";
import { BookRecord } from './book.record';


export interface OrderEntity extends WithId<Document> {
  _id: ObjectId;
}

export class OrderRecord implements OrderEntity {

  _id: ObjectId;
  userId: ObjectId;
  products: BookRecord[];
  statusTransaction: string;
  count: number

  constructor(obj: OrderRecord) {
    const { _id, userId, products, statusTransaction, count } = obj;

    this._id = _id ?? new ObjectId();
    this.userId = userId;
    this.products = products;
    this.statusTransaction = statusTransaction;
    this.count = count ?? 0;
  }

}