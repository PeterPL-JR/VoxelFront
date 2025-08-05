export const textures = [];

const textureLoader = new THREE.TextureLoader();

export function initTextures(data) {
    for(let tex of data) {
        const map = textureLoader.load(tex);
        map.magFilter = map.minFilter = THREE.NearestFilter;
        map.generateMipmaps = false;
        textures.push(new THREE.MeshBasicMaterial({map}));
    }
}