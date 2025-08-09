export class Player {
    x = 0;
    y = 0;
    z = 0;

    pitch = 0;
    yaw = 0;

    socket;

    constructor(socket) {
        this.socket = socket;
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setRotation(pitch, yaw) {
        this.pitch = pitch;
        this.yaw = yaw;
    }
}