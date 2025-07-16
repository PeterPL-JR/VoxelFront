import { sendMessage } from "./socket.js";

let mouseX, mouseY;

export function initMouse() {
    document.body.onmousedown = event => mouseDown(event);
    document.body.onmouseup = event => mouseUp(event);
    document.body.onmousemove = event => mouseMove(event);
    document.body.onwheel = event => mouseWheel(event);

    document.body.onmouseenter = mouseEnter;
    document.body.onmouseleave = mouseLeave;
}

function mouseDown(event) {
    let {x, y, button} = getMouseData(event);
    sendMessage("mouseDown", {x, y, button});
}

function mouseUp(event) {
    let {x, y, button} = getMouseData(event);
    sendMessage("mouseUp", {x, y, button});
}

function mouseMove(event) {
    let {x, y} = getMouseData(event);
        
    let oldX = mouseX;
    let oldY = mouseY;
    
    if(!oldX) oldX = x;
    if(!oldY) oldY = y;
    
    sendMessage("mouseMove", {x, y, oldX, oldY});
    
    mouseX = x;
    mouseY = y;
}

function mouseWheel(event) {
    sendMessage("mouseScroll", {delta: Math.sign(event.deltaY)});
}

function mouseEnter() {
    sendMessage("mouseEnter");
}

function mouseLeave() {
    sendMessage("mouseLeave");
}

function getMouseData(event) {
    return {
        x: event.clientX,
        y: event.clientY,
        button: event.button
    };
}