import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as dotenv from "dotenv";
import { WebSocket } from "ws";

import * as resources from "./resources";
import * as textures from "./textures";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});
const events = {};

const PORT = process.env.PORT;

export const CLIENT_SRC = "src/";
export const CLIENT_TEXTURES = "textures/";
export const CLIENT_LIB = "lib/";

export const CLIENT_LOCATION = "../../client/";
export const CLIENT_SRC_LOCATION = CLIENT_LOCATION + CLIENT_SRC;
export const CLIENT_TEXTURES_LOCATION = CLIENT_LOCATION + CLIENT_TEXTURES;
export const CLIENT_LIB_LOCATION = CLIENT_LOCATION + CLIENT_LIB;

export const RES_LOCATION = "../res/";

app.use(express.static(
    path.join(__dirname, CLIENT_SRC_LOCATION)
));
app.use(express.static(
    path.join(__dirname, CLIENT_TEXTURES_LOCATION)
));
app.use(express.static(
    path.join(__dirname, CLIENT_LIB_LOCATION)
));

function init() : void {
    resources.initGameResources();
    textures.initTextures();

    wsServer.on("connection", socket => {
        const gameData = {textures: textures.TEX_ARRAY};
        sendMessage(socket, "init", gameData);

        socket.onmessage = event => {
            receiveMessage(JSON.parse(event.data));
        }
    });
}

server.listen(PORT, () => {
    init();
});

function addMessageListener(eventName, action) : void {
    events[eventName] = action;
}

function sendMessage(socket, event: string, data = {}) : void {
    socket.send(JSON.stringify({event, data}));
}

function receiveMessage({event, data}) : void {
    let action = events[event];
    if(action) {
        action(data);
    }
}