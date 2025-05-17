const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: false },
  gameId: { type: Number, required: false },
  insRating: { type: Number, required: false },
  tags: { type: [String], required: false },
});

const GameTags = mongoose.model("GameTags", tagSchema);

module.exports = GameTags;
