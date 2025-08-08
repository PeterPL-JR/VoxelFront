import { Block, BLOCKS } from "../terrain/block";
import { CHUNK_SIZE, CHUNK_HEIGHT, EMPTY_BLOCK, getChunkArrayIndex } from "../../../shared/common.js";

export class Chunk {
    static TOTAL_BLOCKS = CHUNK_SIZE * CHUNK_SIZE * CHUNK_HEIGHT;

    x: number;
    z: number;
    blocks = new Int16Array(Chunk.TOTAL_BLOCKS);

    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
        this.blocks.fill(EMPTY_BLOCK);
    }

    addBlock(blockX: number, blockY: number, blockZ: number, block: Block): boolean {
        let x = blockX - this.x * CHUNK_SIZE;
        let z = blockZ - this.z * CHUNK_SIZE;
        
        if(x < 0 || x >= CHUNK_SIZE || z < 0 || z >= CHUNK_SIZE) return false;

        this.blocks[getChunkArrayIndex(x, blockY, z)] = block.id;
        return true;
    }

    getBlock(blockX: number, blockY: number, blockZ: number): Block {
        return BLOCKS[this.blocks[getChunkArrayIndex(blockX, blockY, blockZ)]];
    }

    static getCoordinate(n: number): number {
        return Math.floor(n / CHUNK_SIZE);
    }
}