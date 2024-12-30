var MongoClient = require("mongodb").MongoClient;
const murl = "mongodb+srv://carsvalley:carsvalley@database.0cp4u.mongodb.net/";
// "mongodb+srv://kishoreharry2001:Kichaa0404@cluster0.ki79xbl.mongodb.net/?retryWrites=true&w=majority";
// "mongodb://admin:carsvalley@43.205.236.98:27017/carsvalley?directConnection=true&appName=mongosh+1.10.4";
var MongoDbClient;
var db;

module.exports = {
  getDb: async function () {
    await new Promise((resolve, reject) => {
      if (!MongoDbClient) {
        MongoClient.connect(
          murl,
          { useNewUrlParser: true, useUnifiedTopology: true },
          async function (error, client) {
            if (error) {
              reject(error);
            } else {
              MongoDbClient = client;
              db = await client.db("test");
              resolve();
            }
          }
        );
      } else if (MongoDbClient.isConnected()) {
        resolve();
      } else {
        MongoClient.connect(
          murl,
          { useNewUrlParser: true, useUnifiedTopology: true },
          function (error, client) {
            if (error) {
              reject(error);
            } else {
              db = client.db("test"); //carsvalley
              MongoDbClient = client;
              resolve();
            }
          }
        );
      }
    });
    return db;
  },
};
