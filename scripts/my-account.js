// // my-account.js

// document.addEventListener('DOMContentLoaded', init);

// function init() {
//   const favoritesTab = document.querySelector('.tab[data-tab="favorites"]');
//   const interestedTab = document.querySelector('.tab[data-tab="interested"]');
//   const goingTab = document.querySelector('.tab[data-tab="going"]');
//   const favoritesContent = document.querySelector('.tab-content.favorites .events-container');
//   const interestedContent = document.querySelector('.tab-content.interested .events-container');
//   const goingContent = document.querySelector('.tab-content.going .events-container');

//   favoritesTab.addEventListener('click', () => showEvents('favorites'));
//   interestedTab.addEventListener('click', () => showEvents('interested'));
//   goingTab.addEventListener('click', () => showEvents('going'));

//   function showEvents(list) {
//     // Hide all tab contents
//     hideAllTabContents();

//     // Show selected tab content and load events
//     switch (list) {
//       case 'favorites':
//         favoritesTab.classList.add('active');
//         favoritesContent.style.display = 'block';
//         loadEvents(favoritesContent, 'favorites');
//         break;
//       case 'interested':
//         interestedTab.classList.add('active');
//         interestedContent.style.display = 'block';
//         loadEvents(interestedContent, 'interested');
//         break;
//       case 'going':
//         goingTab.classList.add('active');
//         goingContent.style.display = 'block';
//         loadEvents(goingContent, 'going');
//         break;
//     }
//   }

//   function hideAllTabContents() {
//     favoritesTab.classList.remove('active');
//     interestedTab.classList.remove('active');
//     goingTab.classList.remove('active');
//     favoritesContent.style.display = 'none';
//     interestedContent.style.display = 'none';
//     goingContent.style.display = 'none';
//   }

//   function loadEvents(container, list) {
//     const state = Estado.getInstance();
//     const events = state.getEventsByList(list);

//     if (events.length > 0) {
//       container.innerHTML = '';
//       events.forEach(event => {
//         const eventElement = createEventElement(event);
//         container.appendChild(eventElement);
//       });
//     } else {
//       container.innerHTML = 'There are no events in your ' + list;
//     }
//   }

//   // Helper function to create event element (similar to createEventElement in app.js)
//   function createEventElement(event) {
//     // ...

//     return eventElement;
//   }
// }
