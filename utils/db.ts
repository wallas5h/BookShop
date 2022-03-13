import { MongoClient } from "mongodb";

const uri = process.env.DATABASE;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const client = new MongoClient(uri);
export const newsletterMailList = client.db('Newsletter').collection('list');
export const usersRegistered = client.db('Users').collection('registered');
export const booksStorage = client.db('Books').collection('storage');

try {
  client.connect();
  console.log('Conected with databases')
} catch (error) {
  console.log(error)
}
