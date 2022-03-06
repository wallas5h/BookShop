const { MongoClient } = require("mongodb");

const pass = '3f4zNGDblnXXrZMh'

const uri = `mongodb+srv://guest1:5IvI2wSlnc8J4vYG@cluster0.skad9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(uri, options);

try {
  client.connect();
  console.log('Conected with databases')
} catch (error) {
  console.log(error)
}

module.exports = {
  client
}


// const quotesCol = client.db("Quotes").collection("quotes");