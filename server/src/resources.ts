import * as fs from "fs";
import * as path from "path";

import { RES_LOCATION } from "./app";

export let DATA = {};

export function initGameResources() : void {
    DATA = loadResources(RES_LOCATION, (loc => loadFile(loc)));
}

export function loadResources(location : string, supplier: Function, dirLocation? : string) : {} {
    location = getLocation(location);
    if(dirLocation) {
        dirLocation = getLocation(dirLocation);
    }

    const files = {};
    for(let file of fs.readdirSync(location)) {
        const fileLocation = path.join(location, "/", file);
        if(isDir(fileLocation)) {
            files[file] = loadResources(fileLocation, supplier, dirLocation);
        } else {
            const name = file.substring(0, file.lastIndexOf("."));
            const obj = supplier(dirLocation ? fileLocation.substring(dirLocation.length + 1) : fileLocation);
            obj["name"] = name;
            files[name] = obj;
        }
    }
    return files;
}

function loadFile(location : string) {
    return JSON.parse(fs.readFileSync(location).toString());
}

function getLocation(loc : string) : string {
    return path.resolve(__dirname, loc);
}

function isDir(location : string) : boolean {
    return fs.statSync(location).isDirectory();
}