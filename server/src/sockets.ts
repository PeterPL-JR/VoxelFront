const events = {};

export function init(socket) {
    socket.onmessage = event => {
        receiveMessage(JSON.parse(event.data));
    }
}

export function addMessageListener(eventName, action) {
    events[eventName] = action;
}

export function sendMessage(socket, event: string, data = {}) {
    socket.send(JSON.stringify({event, data}));
}

function receiveMessage({event, data}) {
    let action = events[event];
    if(action) {
        action(data);
    }
}