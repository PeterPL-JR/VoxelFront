(function() {

const shared = {};

def("CHUNK_SIZE", 16);
def("CHUNK_HEIGHT", 256);
def("EMPTY_BLOCK", -1);

def("getChunkArrayIndex", function(x, y, z) {
    return x + (z + y * shared.CHUNK_SIZE) * shared.CHUNK_SIZE;
})

function def(name, value) {
    shared[name] = value;
}

if(typeof module !== 'undefined') {
    module.exports = shared;
} else {
    window = Object.assign(window, shared);
}

})();
