import * as camera from "../camera.js";
import { EventHandler } from "./events.js";

const events = new EventHandler();

export function initMouse() {
    events.addListener("mousedown", mouseDown);
    events.addListener("mouseup", mouseUp);
    events.addListener("mousemove", mouseMove);
    events.addListener("wheel", mouseWheel);

    events.addListener("mouseenter", mouseEnter);
    events.addListener("mouseleave", mouseLeave);
}

export function resetMouse() {
    events.reset();
}

function mouseDown(event) {
}

function mouseUp(event) {
}

function mouseMove(event) {
    let offsetX = event.movementX;
    let offsetY = event.movementY;
    camera.rotate(offsetX, offsetY);
}

function mouseWheel(event) {
}

function mouseEnter() {
}

function mouseLeave() {
}

function getMouseData(event) {
    return {
        x: event.clientX,
        y: event.clientY,
        button: event.button
    };
}