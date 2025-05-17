const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: false },
});

// adding passport-local-mongoose plugins to the userSchema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
