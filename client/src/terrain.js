import { textures } from "./textures.js";

export const blocks = [];

export function init(data) {
    initBlocks(data.blocks);
}

function initBlocks(data) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const bufferSize = Math.pow(2, 16);
    
    for(let obj of data) {
        const texArray = [];
        for(let index of obj.textures) {
            texArray.push(textures[index]);
        }
        const instancedMesh = new THREE.InstancedMesh(geometry, texArray, bufferSize);
        instancedMesh.count = 0;
        blocks[obj.id] = {
            name: obj.name,
            mesh: instancedMesh
        };
    }
}

function addBlock(id, position) {
    const mesh = blocks[id].mesh;

    const matrix = new THREE.Matrix4();
    matrix.setPosition(...position);
    mesh.setMatrixAt(mesh.count, matrix);
    mesh.count++;
    mesh.instanceMatrix.needsUpdate = true;
}