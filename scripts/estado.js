class Estado {
  constructor() {
    this.favorites = [];
    this.interested = [];
    this.going = [];
  }

  static getInstance() {
    if (!Estado.instance) {
      Estado.instance = new Estado();
    }
    return Estado.instance;
  }

  setFavorites(favorites) {
    this.favorites = favorites;
  }

  getFavorites() {
    return this.favorites;
  }

  addToFavorites(eventName) {
    if (!this.isEventInFavorites(eventName)) {
      this.favorites.push(eventName);
    }
  }

  removeFromFavorites(eventName) {
    const index = this.favorites.indexOf(eventName);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  isEventInFavorites(eventName) {
    return this.favorites.includes(eventName);
  }

  setInterested(interested) {
    this.interested = interested;
  }

  getInterested() {
    return this.interested;
  }

  addToInterested(eventName) {
    if (!this.isEventInInterested(eventName)) {
      this.interested.push(eventName);
    }
  }

  removeFromInterested(eventName) {
    const index = this.interested.indexOf(eventName);
    if (index !== -1) {
      this.interested.splice(index, 1);
    }
  }

  isEventInInterested(eventName) {
    return this.interested.includes(eventName);
  }

  setGoing(going) {
    this.going = going;
  }

  getGoing() {
    return this.going;
  }

  addToGoing(eventName) {
    if (!this.isEventGoing(eventName)) {
      this.going.push(eventName);
    }
  }

  removeFromGoing(eventName) {
    const index = this.going.indexOf(eventName);
    if (index !== -1) {
      this.going.splice(index, 1);
    }
  }

  isEventGoing(eventName) {
    return this.going.includes(eventName);
  }
}

export default Estado;
