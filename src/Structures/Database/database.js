const config = require("../jsons/config.json")
const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  mongoURI: config.mongoDB,
  schema: {
    name: "guibsdb",
  },
});
module.exports = db;