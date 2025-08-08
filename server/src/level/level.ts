import { Chunk } from "./chunk";
import { Block } from "../terrain/block";
import { CHUNK_HEIGHT } from "../../../shared/common.js";

export class Level {
    chunks: Chunk[] = [];
    private chunkIndices = new Map();

    addBlock(x: number, y: number, z: number, block: Block): boolean {
        if(y < 0 || y >= CHUNK_HEIGHT) return false;

        const chunk = this.getChunk(x, z);
        chunk.addBlock(x, y, z, block);
        return true;
    }

    private getChunk(x: number, z: number): Chunk {
        const cx = Chunk.getCoordinate(x);
        const cz = Chunk.getCoordinate(z);

        const key = cx + "/" + cz;
        let index = this.chunkIndices[key];

        let chunk: Chunk;
        if(index != undefined) {
            chunk = this.chunks[index];
        } else {
            index = this.chunks.length;
            this.chunkIndices[key] = index;
            chunk = this.chunks[index] = new Chunk(cx, cz);
        }
        return chunk;
    }
}