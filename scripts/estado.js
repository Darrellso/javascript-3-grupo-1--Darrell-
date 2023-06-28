class Estado {
  constructor() {
    this.state = {
      favorites: [],
      interested: [],
      going: []
    };
  }

  static getInstance() {
    if (!Estado.instance) {
      Estado.instance = new Estado();
    }
    return Estado.instance;
  }

  isEventInFavorites(eventName) {
    return this.state.favorites.includes(eventName);
  }

  addToFavorites(eventName) {
    this.state.favorites.push(eventName);
    this.saveState();
  }

  removeFromFavorites(eventName) {
    const index = this.state.favorites.indexOf(eventName);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
      this.saveState();
    }
  }

  isEventInInterested(eventName) {
    return this.state.interested.includes(eventName);
  }

  addToInterested(eventName) {
    this.state.interested.push(eventName);
    this.saveState();
  }

  removeFromInterested(eventName) {
    const index = this.state.interested.indexOf(eventName);
    if (index > -1) {
      this.state.interested.splice(index, 1);
      this.saveState();
    }
  }

  isEventGoing(eventName) {
    return this.state.going.includes(eventName);
  }

  addToGoing(eventName) {
    this.state.going.push(eventName);
    this.saveState();
  }

  removeFromGoing(eventName) {
    const index = this.state.going.indexOf(eventName);
    if (index > -1) {
      this.state.going.splice(index, 1);
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('estado', JSON.stringify(this.state));
  }

  loadState() {
    const savedState = localStorage.getItem('estado');
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  }
}

export default Estado;
