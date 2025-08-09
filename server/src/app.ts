import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as dotenv from "dotenv";
import { WebSocket } from "ws";

import * as resources from "./resources";
import * as textures from "./textures";
import * as sockets from "./sockets";
import * as controller from "./player/controller";

import * as blocks from "./terrain/block"; 
import { Level } from "./level/level";
import { Player } from "./player/player";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

const PORT = process.env.PORT;

export const CLIENT_SRC = "src/";
export const CLIENT_TEXTURES = "textures/";
export const CLIENT_LIB = "lib/";

export const CLIENT_LOCATION = "../../client/";
export const CLIENT_SRC_LOCATION = CLIENT_LOCATION + CLIENT_SRC;
export const CLIENT_TEXTURES_LOCATION = CLIENT_LOCATION + CLIENT_TEXTURES;
export const CLIENT_LIB_LOCATION = CLIENT_LOCATION + CLIENT_LIB;

export const RES_LOCATION = "../res/";
export const SHARED_LOCATION = "../../shared";

let level, player;

app.use(express.static(
    path.join(__dirname, CLIENT_SRC_LOCATION)
));
app.use(express.static(
    path.join(__dirname, CLIENT_TEXTURES_LOCATION)
));
app.use(express.static(
    path.join(__dirname, CLIENT_LIB_LOCATION)
));
app.use(express.static(
    path.join(__dirname, SHARED_LOCATION)
));

function init() : void {
    resources.initGameResources();
    textures.initTextures();

    blocks.initBlocks();
    
    level = new Level();

    for(let x = 0; x < 5; x++) {
        for(let z = 0; z < 5; z++) {
            level.addBlock(x - 2, 0, z - 10, blocks.getBlock("grass_block"));
        }
    }

    wsServer.on("connection", socket => {
        const gameData = {
            textures: textures.TEX_ARRAY,
            terrain: {
                blocks: blocks.getBlocks()
            },
            level: {
                chunks: level.chunks
            }
        };
        sockets.init(socket);
        
        player = new Player(socket);
        controller.init(player);

        sockets.sendMessage(socket, "init", gameData);
    });
}

server.listen(PORT, () => {
    init();
});