const express = require("express");
const { route } = require("express/lib/application");
const consoleController = require("../controllers/console.controller");
const gameController = require("../controllers/game.controller");

const router = express.Router();

router.route('/consoles')
    .get(consoleController.getAll)
    .post(consoleController.addOne);

router.route('/console/:consoleId')
    .get(consoleController.getOne)
    .delete(consoleController.deleteOne)
    .put(consoleController.updateOne);

router.route('/console/:consoleId/games')
    .get(gameController.getAll)
    .post(gameController.addOne);

router.route('/console/:consoleId/game/:gameId')
    .get(gameController.getOne)
    .delete(gameController.deleteOne)
    .put(gameController.updateOne);

module.exports = router;