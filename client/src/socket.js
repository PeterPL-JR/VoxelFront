let socket;
const events = {};

export function initSocket(init) {
    socket = new WebSocket(`ws://${window.location.host}`);
    socket.onopen = init;
    socket.onmessage = (event) => {
        receiveMessage(JSON.parse(event.data));
    }
}

export function addMessageListener(eventName, action) {
    events[eventName] = action;
}

export function sendMessage(eventName, data = {}) {
    socket.send(JSON.stringify({event: eventName, data}));
}

export function receiveMessage({event, data}) {
    const action = events[event];
    if(action) {
        action(data);
    }
}