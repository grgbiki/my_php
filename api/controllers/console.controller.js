const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const GameConsole = mongoose.model(process.env.DB_COLLECTION_CONSOLE);

getAll = (req, res) => {
    let status = 200;
    let response;

    let offset = parseInt(process.env.DEFAULT_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_COUNT, 10);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || offset < 0) {
        offset = 0;
    }
    if (isNaN(count) || count > process.env.COUNT_LIMIT) {
        status = 400;
        response = { "message": "invalid params: count should be a number and less than " + process.env.COUNT_LIMIT }

    }
    if (status !== 200) {
        res.status(status).json(response);
    }
    else {
        GameConsole.find().skip(offset).limit(count).exec(function (err, gameConsoles) {
            if (err) {
                status = 500;
                response = { "message": "Server Error: " + process.env.COUNT_LIMIT }
            } else {
                console.log("Found console", gameConsoles.length);
                response = gameConsoles;
            }
            res.status(status).json(response);
        });
    }
}

addOne = (req, res) => {
    let status = 200;
    let response;

    const newConsole = {
        name: req.body.name,
        brand: req.body.brand,
        releaseDate: req.body.releaseDate,
        games: []
    }

    GameConsole.create(newConsole, (err, gameConsole) => {
        if (err) {
            status = 500;
            response = err;
        } else {
            response = gameConsole;
        }
        res.status(status).json(response);
    });
}

getOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId)) {
        status = 404;
        response = { "message": process.env.RESPONSE_INVALID_ID };
        res.status(status).json(response);
    } else
        GameConsole.findById(gameConsoleId, function (err, gameConsole) {
            if (err) {
                status = 500;
                response = { "message": "Server Error: " + process.env.COUNT_LIMIT }

            }
            else if (!gameConsole) {
                status = 404;
                response = { "message": "Game console not found" }
            } else {
                response = gameConsole
            }
            res.status(status).json(response);
        });
}

updateOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;

    let status = 204;
    let response;

    if (!ObjectId.isValid(gameConsoleId)) {
        status = 404;
        response = { "message": process.env.RESPONSE_INVALID_ID };
        res.status(status).json(response);
    } else
        GameConsole.findById(gameConsoleId).select("-games").exec((err, gameConsole) => {
            if (err) {
                status = 500;
                response = { "message": "Server Error : " + err };
            } else if (!gameConsole) {
                status = 404;
                response = { "message": "Game Console not found" };
            }
            if (status !== 204) {
                res.status(status).json(response);
            } else {
                gameConsole.name = req.body.name;
                gameConsole.brand = req.body.brand;
                gameConsole.releaseDate = req.body.releaseDate;

                gameConsole.save((err, updatedGameConsole) => {
                    if (err) {
                        status = 500;
                        response = { "message": "Server Error : " + err };
                    } else {
                        response = updatedGameConsole;
                    }
                    res.status(status).json(response);
                });
            }
        })
}

deleteOne = (req, res) => {
    const gameConsoleId = req.params.consoleId;

    let status = 200;
    let response;

    if (!ObjectId.isValid(gameConsoleId)) {
        status = 404;
        response = { "message": process.env.RESPONSE_INVALID_ID };
        res.status(status).json(response);
    } else
        GameConsole.findByIdAndDelete(gameConsoleId, (err, gameConsole) => {
            if (err) {
                status = 500;
                response = { "message": "Server Error : " + err };
            } else if (!gameConsole) {
                status = 404;
                response = { "message": "Game Console not found" };
            } else {
                response = { "message": "Game Console deleted successfully" };
            }
            res.status(status).json(response);
        });
}

module.exports = {
    getAll, getOne, updateOne, addOne, deleteOne
}