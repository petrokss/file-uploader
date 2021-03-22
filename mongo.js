const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = process.env.DB_NAME;
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
const connectToDb = () => {
  return new Promise(resolve => {
    client.connect(function (err) {
      assert.strictEqual(null, err);
      console.log('Connected successfully to server');

      const db = client.db(dbName);
      resolve(db);
    })
  })
}

module.exports = connectToDb;