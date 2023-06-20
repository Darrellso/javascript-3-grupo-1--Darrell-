// my-account.js

import { State } from './estado.js';
import { createEventElement } from './utils.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const favoritesTab = document.getElementById('favorites-tab');
  const interestedTab = document.getElementById('interested-tab');
  const goingTab = document.getElementById('going-tab');
  const eventGrid = document.getElementById('event-grid');

  favoritesTab.addEventListener('click', () => showEvents(State.getFavorites()));
  interestedTab.addEventListener('click', () => showEvents(State.getInterested()));
  goingTab.addEventListener('click', () => showEvents(State.getGoing()));

  function showEvents(eventNames) {
    eventGrid.innerHTML = '';

    if (eventNames.length === 0) {
      eventGrid.innerHTML = `<p>There are no events in your list.</p>`;
      return;
    }

    eventNames.forEach(eventName => {
      const event = State.getEvent(eventName);
      if (event) {
        const eventElement = createEventElement(event);
        eventGrid.appendChild(eventElement);

        const removeBtn = createRemoveButton(eventName);
        eventElement.appendChild(removeBtn);
      }
    });
  }

  function createRemoveButton(eventName) {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeFromList(eventName);
      showEvents(State.getCurrentList());
    });
    return removeBtn;
  }

  function removeFromList(eventName) {
    if (State.isEventInFavorites(eventName)) {
      State.removeFromFavorites(eventName);
    }
    if (State.isEventInInterested(eventName)) {
      State.removeFromInterested(eventName);
    }
    if (State.isEventInGoing(eventName)) {
      State.removeFromGoing(eventName);
    }
  }
}
