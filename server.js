const express = require("express")
const server = express();
server.use(express.json())

const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

server.use("/projectRouter", logger, projectRouter)
server.use("/actionRouter", logger, actionRouter)

server.get("/", (req, res) => {
  res.send("API is lit");
})

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.url}`
  );
  next();
}

server.use(logger);

module.exports = server;