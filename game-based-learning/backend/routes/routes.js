const express = require("express");
const passport = require("passport");

const router = express();
const gameController = require("../controllers/controllers");
const authController = require("../controllers/authControllers");
const auth = require("../auth");

//Authentication
router.post("/register", authController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login
);

// GET ALL ROUTE
router.get("/games", gameController.getAllGames);

// GET BY ID ROUTE
router.get("/game/:id", gameController.findGameById);
router.get("/find/:id", gameController.findGameById);
router.get("/search", gameController.searchGameById);
router.post("/add-game", gameController.createGame);
router.post("/update-tags", gameController.updateTags);
router.get("/monthly", gameController.getMonthly);
router.get("/getTags/:id", gameController.getGameTags);
router.delete("/game/:id", gameController.deleteMonthlyGame);

module.exports = router;
