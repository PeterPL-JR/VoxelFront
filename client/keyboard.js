import { sendMessage } from "./socket.js";

export function initKeyboard() {
    document.body.onkeydown = event => keyDown(event);
    document.body.onkeyup = event => keyUp(event);
}

function keyDown(event) {
    sendMessage("keyDown", {key: event.key});
}

function keyUp(event) {
    sendMessage("keyUp", {key: event.key});
}