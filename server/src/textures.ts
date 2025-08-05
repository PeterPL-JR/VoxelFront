import { loadResources } from "./resources";
import { CLIENT_LOCATION, CLIENT_TEXTURES, CLIENT_TEXTURES_LOCATION } from "./app";

export let TEXTURES = {};
export let TEX_ARRAY = {};

let texturesCounter = 0;

export class Texture {
    location: string;
    id: number;

    constructor(location: string) {
        this.location = location;
        this.id = texturesCounter;
        texturesCounter++;
    }
}

export function initTextures() : void {
    TEXTURES = loadTextures(CLIENT_TEXTURES_LOCATION, CLIENT_LOCATION);
    TEX_ARRAY = toResourcesArray(TEXTURES);
}

function loadTextures(location: string, dirLocation: string) : {} {
    return loadResources(location, loc => new Texture(loc), dirLocation);
}

function toResourcesArray(object : {}) : string[] {
    const strings = [];
    for(let key in object) {
        const elem = object[key];
        if(elem.constructor.name == "Texture") {
            strings[elem.id] = elem.location.substring(CLIENT_TEXTURES.length);
        } else {
            const array = toResourcesArray(elem);
            for(let i in array) {
                strings[i] = array[i];
            }
        }
    }
    return strings;
}