const axios = require("axios");
const Game = require("../db/collections/game");
const GameTags = require("../db/collections/gameTags");
require("dotenv").config();

//From API
const getAllGames = async (req, res) => {
  let query =
    "fields id, name, cover.url, first_release_date, game_modes.name, genres.name, screenshots.url, platforms.name, summary, url, themes.name, rating; where platforms = 167 & version_parent = null & game_modes.name != null & genres.name != null & cover.url != null; limit 100;";

  try {
    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find game from API
const findGameById = async (req, res) => {
  const { id } = req.params;

  let query = `fields id, name, cover.url, first_release_date, game_modes.name, genres.name, screenshots.url, platforms.name, summary, url, themes.name, rating; where platforms = 167; where id = ${id}; `;

  try {
    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find game from API
const searchGameById = async (req, res) => {
  const { search } = req.query;
  let query =
    "fields id, name, cover.url, first_release_date, game_modes.name, genres.name, screenshots.url, platforms.name, summary, url, themes.name, rating; where platforms = 167; sort rating desc; limit 100;";
  if (search) {
    query = `search "${search}"; ` + query;
  }
  try {
    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get game from mongo DB
const getMonthly = async (req, res) => {
  Game.find()
    .then((games) => {
      if (!games.length) {
        return res
          .status(404)
          .json({ success: false, data: "No games found." });
      }
      return res.status(200).json({ sucess: true, data: games });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const getGameTags = async (req, res) => {
  GameTags.find()
    .then((games) => {
      if (!games.length) {
        return res
          .status(404)
          .json({ success: false, data: "No games found." });
      } else {
        const myTags = games.filter((item) => item.gameId == req.params.id);
        return res.status(200).json({ sucess: true, data: myTags[0]?.tags });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const createGame = async (req, res) => {
  const { name, gameId, cover } = req.body;

  if (!gameId) {
    return res
      .status(400)
      .json({ success: false, error: "Game ID is required" });
  }

  try {
    const newGame = new Game({ name, gameId, cover });
    await newGame.save();
    res.status(201).json({
      success: true,
      id: newGame._id,
      message: `Game created! id is ${gameId}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Game not created",
    });
  }
};

const updateTags = async (req, res) => {
  const { name, gameId, insRating, tags } = req.body;
  if (!gameId) {
    return res
      .status(400)
      .json({ success: false, error: "Game ID is required" });
  }
  try {
    const newGame = new GameTags({ name, gameId, insRating, tags });
    await newGame.save();
    res.status(201).json({
      success: true,
      id: newGame._id,
      message: `Game created! id is ${gameId}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Game not created",
    });
  }
};

//Routes To be  implemented, DO NOT DELETE
const deleteMonthlyGame = async (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then((game) => {
      if (game === null) {
        return res
          .status(404)
          .json({ success: false, error: "game not found" });
      }
      return res
        .status(200)
        .json({ success: true, data: game, message: "Game deleted" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  getAllGames,
  getMonthly,
  findGameById,
  searchGameById,
  createGame,
  updateTags,
  getGameTags,
  deleteMonthlyGame,
};
