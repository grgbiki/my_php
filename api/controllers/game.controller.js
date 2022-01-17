const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const GameConsole = mongoose.model(process.env.DB_COLLECTION_CONSOLE);

getAll = (req, res) => {
    const gameConsoleId = req.params.consoleId;

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId)) {
        status = 404;
        response = { "message": "Invalid id" };
        res.status(status).json(response);
    } else
        GameConsole.findById(gameConsoleId, (err, gameConsole) => {
            if (err) {
                status = 500;
                response = { "message": "Server Error: " + err };
            } else if (!gameConsole) {
                status = 404;
                response = { "message": "Game console not found" };
            } else {
                response = gameConsole.games;
            }
            res.status(status).json(response);
        });
};

addOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;

    const newGame = {
        name: req.body.name,
        price: parseFloat(req.body.price, 10)
    }

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId)) {
        status = 404;
        response = { "message": "Invalid id" };
        res.status(status).json(response);
    } else
        GameConsole.findById(gameConsoleId, (err, gameConsole) => {
            if (err) {
                status = 500;
                response = { "message": "Server Error: " + err };
            } else if (!gameConsole) {
                status = 404;
                response = { "message": "Game console not found" };
            } else if (isNaN(newGame.price) || newGame.price < 0) {
                status = 400;
                response = { "message": "Invalid price" };
            }
            if (status !== 200) {
                res.status(status).json(response);
            }
            else {
                gameConsole.games.push(newGame);
                gameConsole.save((err, newGameConsole) => {
                    response = newGameConsole;
                    res.status(status).json(response);
                })
            }
        });
};

getOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;
    const gameId = req.params.gameId;

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId) || !ObjectId.isValid(gameId)) {
        status = 404;
        response = { "message": "Invalid ids" };
        res.status(status).json(response);
    } else
        GameConsole.findById(gameConsoleId, (err, gameConsole) => {
            if (err) {
                status = 500;
                response = { "message": "Server Error: " + err };
            } else if (!gameConsole) {
                status = 404;
                response = { "message": "Game console not found" };
            } else if (!gameConsole.games.id(gameId)) {
                status = 404;
                response = { "message": "Game not found" };
            } else {
                response = gameConsole.games.id(gameId);
            }
            res.status(status).json(response);
        });
};

deleteOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;
    const gameId = req.params.gameId;

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId) || !ObjectId.isValid(gameId)) {
        status = 404;
        response = { "message": "Invalid ids" };
        res.status(status).json(response);
    } elseGameConsole.findById(gameConsoleId, (err, gameConsole) => {
        if (err) {
            status = 500;
            response = { "message": "Server Error: " + err };
        } else if (!gameConsole) {
            status = 404;
            response = { "message": "Game console not found" };
        }
        if (status !== 200) {
            res.status(status).json(response);
        }
        else {
            gameConsole.games.pull({ _id: gameId })

            gameConsole.save((err, newGameConsole) => {
                if (err) {
                    status = 500;
                    response = { "message": "Server Error: " + err };
                } else {
                    response = newGameConsole;
                }
                res.status(status).json(response);
            })
        }
    });
};

updateOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;
    const gameId = req.params.gameId;

    let status = 204;
    let response;

    if (!ObjectId.isValid(gameConsoleId) || !ObjectId.isValid(gameId)) {
        status = 404;
        response = { "message": "Invalid ids" };
        res.status(status).json(response);
    } elseGameConsole.findById(gameConsoleId, (err, gameConsole) => {
        if (err) {
            status = 500;
            response = { "message": "Server Error: " + err };
        } else if (!gameConsole) {
            status = 404;
            response = { "message": "Game console not found" };
        }
        if (status !== 204) {
            res.status(status).json(response);
        }
        else {
            gameConsole.games.id(gameId).name = req.body.name;
            gameConsole.games.id(gameId).price = parseFloat(req.body.price, 10);
            gameConsole.save((err, updatedGame) => {
                response = updatedGame.games.id(gameId);
                res.status(status).json(response);
            });
        }
    });
};

module.exports = {
    getAll, addOne, getOne, deleteOne, updateOne
}