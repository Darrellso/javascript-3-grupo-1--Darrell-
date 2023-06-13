import { getEvents } from './api.js';
import { formatDate, formatPrice, formatLocation } from './utils.js';
import { eventCache } from './cache.js'; 

document.addEventListener('DOMContentLoaded', init);

function init() {
  const musicTab = document.getElementById('music-tab');
  const sportsTab = document.getElementById('sports-tab');
  const businessTab = document.getElementById('business-tab');
  const foodTab = document.getElementById('food-tab');
  const artTab = document.getElementById('art-tab');
  const eventGrid = document.getElementById('event-grid');

  musicTab.addEventListener('click', () => loadEvents('music'));
  sportsTab.addEventListener('click', () => loadEvents('sports'));
  businessTab.addEventListener('click', () => loadEvents('business'));
  foodTab.addEventListener('click', () => loadEvents('food'));
  artTab.addEventListener('click', () => loadEvents('art'));

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

    return eventElement;
  }
}
