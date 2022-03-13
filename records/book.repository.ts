import { Document, ObjectId, WithId } from "mongodb";
import { booksStorage } from "../utils/db";
import { BookRecord } from "./book.record";

type BooksRecordsResults = WithId<Document>[];

export class BookRepository {

  static async findAll() {

    let newArr = [];

    const results = await booksStorage.find();
    const resultsArray = await results.toArray();
    resultsArray.forEach(item => newArr.push(item))

    return newArr.map(el => new BookRecord(el))
  }

  static async findOneById(id: string) {
    const item = ((await booksStorage.findOne({ "_id": new ObjectId(id) }))) as BookRecord
    return item === null ? null : new BookRecord(item)
  }

  static async findOneByTitle(title: string) {
    const item = ((await booksStorage.findOne({ "title": title }))) as BookRecord
    return item === null ? null : new BookRecord(item)
  }

  static async update(record: BookRecord) {
    await booksStorage.replaceOne({ "_id": new ObjectId(record._id) }, record)
  }


  static async insertbooks() {
    await booksStorage.insertMany(books)
  }
  static async deleteAllbooks() {
    await booksStorage.deleteMany({});
  }
}






const books = [
  {
    title: "The Art City",
    image: "book-1",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about love in .. "
  },
  {
    title: "Give thanks in everything",
    image: "book-2",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about  .. "
  },
  {
    title: "Your name",
    image: "book-3",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Your title gose here",
    image: "book-4",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Rock music",
    image: "book-5",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Sample text",
    image: "book-6",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Live in Lighthouse",
    image: "book-7",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Black history month",
    image: "book-8",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Love",
    image: "book-9",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },
  {
    title: "Retro",
    image: "book-10",
    newPrice: 15.99,
    oldPrice: 20.99,
    purchasePrice: 10.00,
    count: 20,
    description: "Famous history about .. "
  },

]

