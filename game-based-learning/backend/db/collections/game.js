const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: false },
  gameId: { type: Number, required: false },
  cover: { type: String, required: false },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
