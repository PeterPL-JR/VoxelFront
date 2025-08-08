import { textures } from "./textures.js";

export const blocks = [];

export function init(data, level) {
    initBlocks(data.blocks);

    for(let chunk of level.chunks) {
        const x = chunk.x * CHUNK_SIZE;
        const z = chunk.z * CHUNK_SIZE;
        
        const blocks = chunk.blocks;

        for(let i = 0; i < CHUNK_SIZE; i++) {
            for(let j = 0; j < CHUNK_HEIGHT; j++) {
                for(let k = 0; k < CHUNK_SIZE; k++) {
                    const block = blocks[getChunkArrayIndex(i, j, k)];
                    
                    const xx = i + x;
                    const yy = j;
                    const zz = k + z;

                    if(block != EMPTY_BLOCK) {
                        addBlock(block, xx, yy, zz);
                    }
                }
            }
        }
    }
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

function addBlock(id, x, y, z) {
    const mesh = blocks[id].mesh;

    const matrix = new THREE.Matrix4();
    matrix.setPosition(x, y, z);
    mesh.setMatrixAt(mesh.count, matrix);
    mesh.count++;
    mesh.instanceMatrix.needsUpdate = true;
}