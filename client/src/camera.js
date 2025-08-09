import * as sockets from "./sockets.js";
import { toRadians } from "./maths.js";

const MOVE_SPEED = 0.5;
const ROTATION_SPEED = toRadians(0.25);

const MIN_PITCH = toRadians(-89);
const MAX_PITCH = toRadians(89);

let camera;

let pitch = 0;
let yaw = 0;

let moving = false;
const direction = new THREE.Vector3();
const buffer = new THREE.Vector3();
const strafe = new THREE.Vector3();

export function initCamera(width, height, scene) {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    camera.position.set(0, 0, 0);
    camera.rotation.order = "YXZ";
    getCameraDirection();

    sockets.addMessageListener("move", applyPosition);

    scene.add(camera);
    return camera;
}

export function updateCamera() {
    if(moving) {
        sockets.sendMessage("tryMove", [buffer.x, buffer.y, buffer.z]);
    }
    moving = false;
}

export function moveLeft() {
    moveCross(-MOVE_SPEED)
}

export function moveRight() {
    moveCross(MOVE_SPEED);
}

export function moveForward() {
    moveStraight(MOVE_SPEED);
}

export function moveBack() {
    moveStraight(-MOVE_SPEED);
}

export function moveUp() {
    moveVertically(MOVE_SPEED);
}

export function moveDown() {
    moveVertically(-MOVE_SPEED);
}

export function applyPosition() {
    camera.position.set(buffer.x, buffer.y, buffer.z);
}

function move(vector, speed) {
    buffer.addScaledVector(vector, speed);
    moving = true;
}

function moveStraight(speed) {
    move(direction, speed);
}

function moveCross(speed) {
    strafe.crossVectors(direction, camera.up).normalize();
    move(strafe, speed);
}

function moveVertically(speed) {
    move(camera.up, speed);
}

export function rotate(deltaX, deltaY) {
    if(!camera) return;
    pitch -= ROTATION_SPEED * deltaY;
    yaw -= ROTATION_SPEED * deltaX;

    if(pitch < MIN_PITCH) pitch = MIN_PITCH;
    if(pitch > MAX_PITCH) pitch = MAX_PITCH;

    camera.rotation.set(pitch, yaw, 0);
    sockets.sendMessage("rotate", [pitch, yaw]);
}

export function getCameraDirection() {
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();
}