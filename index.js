require("dotenv").config();
require("./api/data/dbconnection")

const express = require("express");

const router = require("./api/routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    next();
});

app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
    console.log("Server listening on port", server.address().port);
})