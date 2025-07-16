import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as dotenv from "dotenv";

import { WebSocket } from "ws";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

const PORT = process.env.PORT;

export const CLIENT_LOCATION = "../../client/";
export const CLIENT_SRC_LOCATION = CLIENT_LOCATION + "src/";

app.use(express.static(
    path.join(__dirname, CLIENT_SRC_LOCATION)
));

function init() {
    wsServer.on("connection", socket => {
        socket.onmessage = event => {
            receiveMessage(JSON.parse(event.data));
        }
    });
}

server.listen(PORT, () => {
    init();
});

function receiveMessage({event, data}) {
    console.log(event, data);
}