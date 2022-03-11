import { MongoClient } from "mongodb";

const pass = '3f4zNGDblnXXrZMh'

const uri = `mongodb+srv://guest1:5IvI2wSlnc8J4vYG@cluster0.skad9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const client = new MongoClient(uri);
export const newsletterMailList = client.db('Newsletter').collection('list');
export const usersRegistered = client.db('Users').collection('registered');

try {
  client.connect();
  console.log('Conected with databases')
} catch (error) {
  console.log(error)
}



// const quotesCol = client.db("Quotes").collection("quotes");