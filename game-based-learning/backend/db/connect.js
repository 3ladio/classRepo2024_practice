const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const dbname = "game_base_db";
// const uri = `mongodb+srv://cobi17able:Chryz_115@cluster0.5mmjtf4.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@${process.env.mongodb_uri}/${dbname}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then((con) => {
    console.log("Connected to MongoDB Successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
