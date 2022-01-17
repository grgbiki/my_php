const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = gameSchema;