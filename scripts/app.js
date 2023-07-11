import { getEvents } from './api.js';
import { formatDate, formatPrice, formatLocation } from './utils.js';
import { eventCache } from './cache.js';
import Estado from './estado.js';
import { hideAllTabContents } from './tabs.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const musicTab = document.getElementById('music-tab');
  const sportsTab = document.getElementById('sports-tab');
  const businessTab = document.getElementById('business-tab');
  const foodTab = document.getElementById('food-tab');
  const artTab = document.getElementById('art-tab');
  const myAccountTab = document.getElementById('my-account-tab');
  const eventGrid = document.getElementById('event-grid');

  musicTab.addEventListener('click', () => loadEvents('music'));
  sportsTab.addEventListener('click', () => loadEvents('sports'));
  businessTab.addEventListener('click', () => loadEvents('business'));
  foodTab.addEventListener('click', () => loadEvents('food'));
  artTab.addEventListener('click', () => loadEvents('art'));
  myAccountTab.addEventListener('click', () => {
    window.location.href = './cuenta.html';
    function init() {
      // ...

      loadEventsFromStorage(); // Cargar eventos desde el almacenamiento local
    }

    function loadEventsFromStorage() {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        const events = JSON.parse(savedEvents);
        const state = Estado.getInstance();

        state.setFavorites(events.favorites || []);
        state.setInterested(events.interested || []);
        state.setGoing(events.going || []);
      }
    }

  });

  function loadEvents(category) {
    if (category in eventCache) {
      const events = eventCache[category];
      renderEvents(events);
    } else {
      getEvents(category)
        .then(events => {
          eventCache[category] = events;
          renderEvents(events);
        })
        .catch(error => console.error(error));
    }
  }

  function renderEvents(events) {
    eventGrid.innerHTML = '';

    events.forEach(event => {
      const eventElement = createEventElement(event);
      eventGrid.appendChild(eventElement);
    });
  }

  function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.dataset.name = event.name;

    const formattedDate = formatDate(new Date(event.date));
    const formattedPrice = formatPrice(event.price);
    const formattedLocation = formatLocation(event.location);

    eventElement.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <h3>${event.title}</h3>
      <p>Date: ${formattedDate}</p>
      <p>Location: ${formattedLocation}</p>
      <p>Price: ${formattedPrice}</p>
    `;

    const state = Estado.getInstance();
    const eventName = event.name;

    // Add favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.dataset.event = eventName;
    favoriteBtn.innerHTML = `<i class="far fa-heart"></i>`;
    favoriteBtn.addEventListener('click', () => toggleFavorite(eventName, favoriteBtn));
    eventElement.appendChild(favoriteBtn);

    // Add interested button
    const interestedBtn = document.createElement('button');
    interestedBtn.classList.add('interested-btn');
    interestedBtn.dataset.event = eventName;
    interestedBtn.textContent = 'Interested';
    interestedBtn.addEventListener('click', () => toggleInterested(eventName, interestedBtn));
    eventElement.appendChild(interestedBtn);

    // Add going button
    const goingBtn = document.createElement('button');
    goingBtn.classList.add('going-btn');
    goingBtn.dataset.event = eventName;
    goingBtn.textContent = 'Going!';
    goingBtn.addEventListener('click', () => toggleGoing(eventName, goingBtn));
    eventElement.appendChild(goingBtn);

    // Check state and update buttons
    if (state.isEventInFavorites(eventName)) {
      favoriteBtn.classList.add('favorite');
    }
    if (state.isEventInInterested(eventName)) {
      interestedBtn.style.display = 'none';
    }
    if (state.isEventGoing(eventName)) {
      goingBtn.style.display = 'none';
    }

    return eventElement;
  }

  function toggleFavorite(eventName, favoriteBtn) {
    const state = Estado.getInstance();

    if (state.isEventInFavorites(eventName)) {
      state.removeFromFavorites(eventName);
      favoriteBtn.classList.remove('favorite');
    } else {
      state.addToFavorites(eventName);
      favoriteBtn.classList.add('favorite');
    }

    saveEvents(); // Guardar eventos en el almacenamiento local
  }


  function toggleInterested(eventName, interestedBtn) {
    const state = Estado.getInstance();

    if (state.isEventInInterested(eventName)) {
      state.removeFromInterested(eventName);
      interestedBtn.style.display = 'block';
    } else {
      state.addToInterested(eventName);
      state.removeFromGoing(eventName);
      interestedBtn.style.display = 'none';
    }

    saveEvents(); // Guardar eventos en el almacenamiento local
  }


  function toggleGoing(eventName, goingBtn) {
    const state = Estado.getInstance();
  
    if (state.isEventGoing(eventName)) {
      state.removeFromGoing(eventName);
      goingBtn.style.display = 'block';
    } else {
      state.addToGoing(eventName);
      state.removeFromInterested(eventName);
      goingBtn.style.display = 'none';
      
      saveEvents(); // Guardar eventos en el almacenamiento local

    }
  }
  

  function saveEvents() {
    const state = Estado.getInstance();
    const events = {
      favorites: state.getFavorites(),
      interested: state.getInterested(),
      going: state.getGoing(),
    };

    localStorage.setItem('events', JSON.stringify(events));
  }
}

