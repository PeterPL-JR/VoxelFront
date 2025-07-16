let socket;

export function initSocket(onOpen) {
    socket = new WebSocket(`ws://${window.location.host}`);
    socket.onopen = onOpen;
}

export function sendMessage(eventName, data = {}) {
    socket.send(JSON.stringify({event: eventName, data}));
}