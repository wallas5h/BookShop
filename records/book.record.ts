import type { Document, WithId } from 'mongodb';
import { ObjectId } from "mongodb";


export interface BookEntity extends WithId<Document> {
  _id: ObjectId;
}

export class BookRecord implements BookEntity {

  _id: ObjectId;
  title: string;
  image: string;
  newPrice: string;
  oldPrice: string;
  purchasePrice: string;
  description: string;

  constructor(obj: BookRecord) {
    const { _id, title, image, newPrice, oldPrice, purchasePrice, description } = obj;

    this._id = _id ?? new ObjectId();
    this.title = title;
    this.image = image;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
    this.purchasePrice = purchasePrice;
    this.description = description;
  }

}