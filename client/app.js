import { initSocket, sendMessage } from "./socket.js";

import { initKeyboard } from "./keyboard.js";
import { initMouse } from "./mouse.js";

(function() {

const canvas = document.querySelector("canvas");
let width, height;
let renderer, scene, camera;

initSocket(init);

function init() {
    initKeyboard();
    initMouse();

    setSize();
    initScene();

    update();
    
    window.onresize = resize;
    canvas.oncontextmenu = () => false;
}

function initScene() {
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(width, height);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    camera.position.set(0, 0, 0);

    scene = new THREE.Scene();
    scene.add(camera);
}

function update() {
    requestAnimationFrame(update);
    render();
}

function render() {
    renderer.render(scene, camera);
}

function resize() {
    setSize();

    canvas.width = width;
    canvas.height = height;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function setSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    sendMessage("resize", {width, height});
}

})();