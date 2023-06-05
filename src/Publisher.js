class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  publish(data) {
    this.subscribers.forEach(cb => cb(data))
  }
}

export default Publisher;