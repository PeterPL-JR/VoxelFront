import * as sockets from "./sockets.js";

import { initKeyboard, resetKeyboard, updateKeyboard } from "./input/keyboard.js";
import { initMouse, resetMouse } from "./input/mouse.js";

import * as terrain from "./terrain.js";
import { initTextures } from "./textures.js";
import { initCamera } from "./camera.js";

(function() {

const canvas = document.querySelector("canvas");
let width, height;
let renderer, scene, camera;

sockets.init(init);

function init() {
    initScreen();

    sockets.addMessageListener("init", (data) => {
        setSize();

        initTextures(data.textures);
        terrain.init(data.terrain, data.level);

        initScene();
        update();
    });
}

function initScene() {
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(width, height);
    
    scene = new THREE.Scene();
    camera = initCamera(width, height, scene);

    for(let block of terrain.blocks) {
        scene.add(block.mesh);
    }
}

function initScreen() {
    window.onresize = resize;
    canvas.oncontextmenu = () => false;

    document.addEventListener("pointerlockchange", () => {
        if(document.pointerLockElement == canvas) {
            initKeyboard();
            initMouse();
        } else {
            resetKeyboard();
            resetMouse();
        }
    });

    canvas.addEventListener("click", lockPointer);
    lockPointer();
}

function update() {
    requestAnimationFrame(update);
    updateKeyboard();
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

    sockets.sendMessage("resize", {width, height});
}

function lockPointer() {
    canvas.requestPointerLock().catch(() => {
        setTimeout(() => {
            lockPointer();
        }, 100);
    });
}

})();