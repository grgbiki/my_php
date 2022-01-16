const express = require("express");
const { append } = require("express/lib/response");

const router = require("./api/routes");

append.use("/", router);