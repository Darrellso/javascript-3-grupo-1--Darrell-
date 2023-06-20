// estado.js

export class State {
  constructor() {
    this.favorites = [];
    this.interested = [];
    this.going = [];
    this.events = [];
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

  getFavorites() {
    return this.favorites;
  }

  isEventInFavorites(eventName) {
    return this.favorites.includes(eventName);
  }

  // Implementa las demás funciones y propiedades de la clase State
  // según los requisitos de tu aplicación
}
