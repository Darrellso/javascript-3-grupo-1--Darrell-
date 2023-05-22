class Observer {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) {
      return;
    }

    const index = this.subscribers[event].indexOf(callback);
    if (index !== -1) {
      this.subscribers[event].splice(index, 1);
    }
  }

  notify(event) {
    if (!this.subscribers[event]) {
      return;
    }

    this.subscribers[event].forEach((callback) => {
      callback();
    });
  }
}

export default Observer;
