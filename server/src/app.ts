import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as dotenv from "dotenv";

import { WebSocket } from "ws";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});
const events = {};

const PORT = process.env.PORT;

export const CLIENT_LOCATION = "../../client/";
export const CLIENT_SRC_LOCATION = CLIENT_LOCATION + "src/";

app.use(express.static(
    path.join(__dirname, CLIENT_SRC_LOCATION)
));

function init() {
    wsServer.on("connection", socket => {
        const gameData = {};
        sendMessage(socket, "init", gameData);

        socket.onmessage = event => {
            receiveMessage(JSON.parse(event.data));
        }
    });
}

server.listen(PORT, () => {
    init();
});

function addMessageListener(eventName, action) {
    events[eventName] = action;
}

function sendMessage(socket, event: String, data = {}) {
    socket.send(JSON.stringify({event, data}));
}

function receiveMessage({event, data}) {
    let action = events[event];
    if(action) {
        action(data);
    }
}