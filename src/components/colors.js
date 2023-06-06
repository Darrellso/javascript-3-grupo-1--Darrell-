const colorInputs = Array.from(document.querySelectorAll('.color'));
const colorChange = {
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  publish(color) {
    this.subscribers.forEach(callback => callback(color));
  }
};

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
  colorChange
};
