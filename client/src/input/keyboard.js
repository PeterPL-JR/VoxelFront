import * as camera from "../camera.js";
import { EventHandler } from "./events.js";

const keys = {};
const events = new EventHandler();

export function initKeyboard() {
    events.addListener("keydown", keyDown);
    events.addListener("keyup", keyUp);
}

export function resetKeyboard() {
    events.reset();
}

export function updateKeyboard() {
    camera.getCameraDirection();

    if(keys["W"]) camera.moveForward();
    if(keys["S"]) camera.moveBack();
    if(keys["A"]) camera.moveLeft();
    if(keys["D"]) camera.moveRight();
    
    if(keys[" "]) camera.moveUp();
    if(keys["SHIFT"]) camera.moveDown();

    camera.updateCamera();
}

function keyDown(event) {
    keys[event.key.toUpperCase()] = true;
}

function keyUp(event) {
    keys[event.key.toUpperCase()] = false;
}