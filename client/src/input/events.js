export class EventHandler {
    constructor() {
        this.eventListeners = [];
    }

    addListener(name, event) {
        document.body.addEventListener(name, event);
        this.eventListeners.push({name, event});
    }

    removeListener(listener) {
        document.body.removeEventListener(listener.name, listener.event);
    }

    reset() {
        this.eventListeners.forEach(this.removeListener);
        this.eventListeners = [];
    }
}