// Array de plantas recomendadas
const plants = [
  {
    name: 'Low Light Plant',
    soil: 'Drainage Soil',
    pot: 'Clay pot',
    color: 'clay',
    extras: []
  },
  {
    name: 'Medium Light Plant',
    soil: 'Drainage Soil',
    pot: 'Clay pot',
    color: 'clay',
    extras: []
  },
  {
    name: 'Outdoor Plant',
    soil: 'Fertilized Soil',
    pot: 'Clay pot',
    color: 'clay',
    extras: []
  },
  {
    name: 'Succulent',
    soil: 'Succulent Mix',
    pot: 'Ceramic pot',
    color: 'blue',
    extras: ['Pebbles']
  },
  {
    name: 'Snake Plant',
    soil: 'Well-draining Soil',
    pot: 'Clay pot',
    color: 'yellow',
    extras: []
  },
  {
    name: 'Peace Lily',
    soil: 'Well-draining Soil',
    pot: 'Ceramic pot',
    color: 'pink',
    extras: ['Moss pole']
  }
  // Agrega más plantas recomendadas según tus necesidades
];

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function areExtrasMatch(plantExtras, selectedExtras) {
  return plantExtras.every(extra => Array.from(selectedExtras).some(selectedExtra => selectedExtra.value === extra));
}

function handleSubmit(event) {
  event.preventDefault();

  // Obtener selecciones del usuario
  const placement = document.querySelector('input[name="placement"]:checked');
  const sunlight = document.querySelector('input[name="sunlight"]:checked');
  const pets = document.querySelector('input[name="pets"]:checked');
  const watering = document.querySelector('input[name="watering"]:checked');
  const style = document.querySelector('input[name="style"]:checked');
  const extras = document.querySelectorAll('input[name="extras"]:checked');

  // Verificar si todos los campos requeridos están completos
  const requiredFields = [placement, sunlight, pets, watering, style];
  const allFieldsCompleted = areAllFieldsCompleted(requiredFields);

  // Agregar/quitar clase para resaltar los campos requeridos
  requiredFields.forEach(field => {
    if (field === null) {
      field.parentNode.classList.add('highlight');
    } else {
      field.parentNode.classList.remove('highlight');
    }
  });

  // Mostrar ficha de planta solo si todos los campos requeridos están completos
  const plantCard = document.getElementById('plant-card');
  if (allFieldsCompleted) {
    // Filtrar plantas basado en las selecciones del usuario
    const filteredPlants = plants.filter(plant => {
      return (
        plant.placement === placement.value &&
        plant.sunlight === sunlight.value &&
        plant.pets === pets.value &&
        plant.watering === watering.value &&
        plant.style === style.value &&
        areExtrasMatch(plant.extras, extras)
      );
    });

    // Mostrar ficha de planta recomendada
    if (filteredPlants.length > 0) {
      const selectedPlant = filteredPlants[0];

      document.getElementById('plant-name').textContent = capitalizeFirstLetter(selectedPlant.name);
      document.getElementById('soil').textContent = selectedPlant.soil;
      document.getElementById('pot').textContent = selectedPlant.pot;
      document.getElementById('color').textContent = selectedPlant.color;

      const extrasList = document.getElementById('extras');
      extrasList.innerHTML = '';
      if (selectedPlant.extras.length > 0) {
        selectedPlant.extras.forEach(extra => {
          const li = document.createElement('li');
          li.textContent = extra;
          extrasList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'None';
        extrasList.appendChild(li);
      }

      const imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
      const images = [
        `Assets/${selectedPlant.pot.toLowerCase().replace(/\s/g, '-')}.png`,
        ...selectedPlant.extras.map(extra => `Assets/${extra.toLowerCase().replace(/\s/g, '-')}.png`),
        `Assets/${selectedPlant.soil.toLowerCase().replace(/\s/g, '-')}.png`,
        `Assets/${selectedPlant.name.toLowerCase().replace(/\s/g, '-')}.png`
      ];

      images.reverse().forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = image.split('/').pop().split('.').shift();
        imageContainer.appendChild(img);
      });

      plantCard.style.display = 'block';
    } else {
      plantCard.style.display = 'none';
      alert('No plants match your criteria.');
    }
  } else {
    plantCard.style.display = 'none';
    alert('Please complete all required fields.');
  }
}

// Función para verificar si todos los campos requeridos están completos
function areAllFieldsCompleted(fields) {
  return fields.every(field => field !== null);
}

// Asignar el evento submit al formulario
const form = document.getElementById('plant-form');
form.addEventListener('submit', handleSubmit);

// Asignar el evento click al botón Clear
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  form.reset();
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';
  document.getElementById('plant-card').style.display = 'none';
});
