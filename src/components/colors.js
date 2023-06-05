import Publisher from '../Publisher.js';

const colorInputs = document.querySelectorAll('.color');
const colorChange = new Publisher();

function handleColorChange(event) {
  const color = event.currentTarget.dataset.id;
  colorChange.publish(color);
}

function initColors() {
  colorInputs.forEach(col => {
    col.addEventListener('change', handleColorChange);
  });
}

export {
  initColors,
  colorChange,
}