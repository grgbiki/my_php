const mongoose = require("mongoose");
const gameSchema = require("./game-model");

const consoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    games: [gameSchema],
});

mongoose.model(process.env.DB_COLLECTION_CONSOLE, consoleSchema);