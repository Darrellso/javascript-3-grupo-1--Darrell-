// utils.js

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function formatLocation(location) {
  if (typeof location !== 'string') {
    return '';
  }

  return location.toUpperCase();
}

export function createEventElement(event) {
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

  return eventElement;
}
