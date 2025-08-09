import * as sockets from "../sockets";
import { Player } from "./player";

let player: Player;

export function init(_player: Player) {
    player = _player;

    sockets.addMessageListener("move", movePlayer);
    sockets.addMessageListener("rotate", rotatePlayer);

    sockets.addMessageListener("tryMove", tryMovePlayer);
}

function movePlayer([x, y, z]) {
    player.setPosition(x, y, z);
}

function rotatePlayer([yaw, pitch]) {
    player.setRotation(yaw, pitch);
}

function tryMovePlayer(position) {
    sockets.sendMessage(player.socket, "move");
}