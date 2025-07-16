const express = require("express");

const http = require("http");
const path = require("path");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

import {WebSocket} from "ws";
const wsServer = new WebSocket.Server({server});

const PORT = process.env.PORT;

app.use(express.static(
    path.join(__dirname, "../../client/")
));

wsServer.on("connection", socket => {
    socket.onmessage = event => {
        receiveMessage(JSON.parse(event.data));
    }
});

server.listen(PORT, () => {});

function receiveMessage({event, data}) {
    console.log(event, data);
}