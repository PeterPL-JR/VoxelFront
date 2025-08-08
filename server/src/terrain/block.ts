import { TEXTURES } from "../textures";
import { DATA } from "../resources";

const BLOCK_SIDES = ["right", "left", "top", "bottom", "front", "back"];
let blockCounter = 0;

let BLOCK_MODELS = {};
let BLOCK_TEXTURES = {};

export class Block {
    name: string;
    id: number;
    textures: {};
    
    constructor(name: string) {
        this.name = name;
        this.id = blockCounter;
        blockCounter++;
    }
}

export const BLOCKS = [
    new Block("grass_block"),
    new Block("dirt"),
    new Block("stone"),
    new Block("cobblestone"),
    new Block("oak_log")
];

const BLOCK_IDS = {};

const MODEL_TYPES = {
    default: defaultBlock,
    custom: customBlock,
    pillar: pillarBlock
};

export function initBlocks(): void {
    BLOCK_MODELS = DATA["models"]["block"];
    BLOCK_TEXTURES = TEXTURES["block"];

    for(let block of BLOCKS) {
        const model = BLOCK_MODELS[block.name];
        const builder = MODEL_TYPES[model["type"]];

        block.textures = {};
        builder(model, block.textures);
        BLOCK_IDS[block.name] = block.id;
    }
}

export function getBlocks(): Block[] {
    const blocks = [];
    for(let block of BLOCKS) {
        const textures = [];
        for(let side of BLOCK_SIDES) {
            textures.push(BLOCK_TEXTURES[block.textures[side]].id);
        }
        blocks[block.id] = {id: block.id, name: block.name, textures};
    }
    return blocks;
}

export function getBlock(name: string): Block {
    return BLOCKS[BLOCK_IDS[name]];
}

function defaultBlock(data: {}, out: {}): void {
    for(let side of BLOCK_SIDES) {
        out[side] = BLOCK_TEXTURES[data["name"]]["name"];
    }
}

function customBlock(data: {}, out: {}): void {
    const textures = data["textures"];
    for(let side of Object.keys(textures)) {
        out[side] = textures[side];
    }
}

function pillarBlock(data: {}, out: {}): void {
    const textures = data["textures"];

    out["top"] = BLOCK_TEXTURES[textures["top"]]["name"];
    out["bottom"] = BLOCK_TEXTURES[textures["top"]]["name"];

    for(let side of ["right", "left", "front", "back"]) {
        out[side] = BLOCK_TEXTURES[data["name"]]["name"];
    }
}