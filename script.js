//script.js
const plants = [
  {
    name: 'Sansevieria',
    soil: 'Easy Drainage Soil',
    pot: 'Ceramic pot',
    color: 'yellow',
    extras: ['Moss pole'],
    toxic: true,
  },
  {
    name: 'Boston Fern',
    soil: 'Composted Soil',
    pot: 'Ceramic pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: false,
  },
  {
    name: 'Aglaonema',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'pink',
    extras: ['Moss pole'],
    toxic: true,
  },
  {
    name: 'Monstera',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'blue',
    extras: ['Moss pole'],
    toxic: false,
  },
  {
    name: 'Aloe Vera',
    soil: 'Fertilized Soil',
    pot: 'Ceramic pot',
    color: 'yellow',
    extras: ['Pebbles'],
    toxic: true,
  },
  {
    name: 'Cactus',
    soil: 'Fertilized Soil',
    pot: 'Simple pot',
    color: 'yellow',
    extras: ['Pebbles'],
    toxic: false,
  },

  {
    name: 'Snake Plant',
    soil: 'Easy Drainage Soil',
    pot: 'Ceramic pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: true,
  },
  {
    name: 'Peace Lily',
    soil: 'Composted Soil',
    pot: 'Simple pot decorated',
    color: 'white',
    extras: ['Pebbles', 'Mini Plants'],
    toxic: true,
  },
  {
    name: 'Spider Plant',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: false,
  },
  {
    name: 'Dracaena',
    soil: 'Easy Drainage Soil',
    pot: 'Ceramic pot',
    color: 'yellow',
    extras: ['Moss pole', 'Mini Plants'],
    toxic: true,
  },
  {
    name: 'Rubber Plant',
    soil: 'Composted Soil',
    pot: 'Simple pot decorated',
    color: 'green',
    extras: ['Moss pole', 'Pebbles'],
    toxic: false,
  },
  {
    name: 'Fiddle Leaf Fig',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'green',
    extras: ['Moss pole', 'Pebbles', 'Mini Plants'],
    toxic: false,
  },
  {
    name: 'Fiddle Leaf Fig',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'green',
    extras: ['Moss pole', 'Pebbles', 'Mini Plants'],
    toxic: false,
  },
];

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function areExtrasMatch(plantExtras, selectedExtras) {
  return plantExtras.every((extra) =>
    Array.from(selectedExtras).some(
      (selectedExtra) => selectedExtra.value === extra,
    ),
  );
}

function getImageFileName(plantName) {
  return plantName.toLowerCase().replace(/\s+/g, '-') + '.png';
}

function findMatchingPlant(selectedAnswers) {
  return plants.find((plant) => {
    return (
      plant.placement === selectedAnswers.placement &&
      plant.sunlight === selectedAnswers.sunlight &&
      plant.pets === selectedAnswers.pets &&
      plant.watering === selectedAnswers.watering &&
      plant.style === selectedAnswers.style &&
      areExtrasMatch(plant.extras, selectedAnswers.extras)
    );
  });
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

  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  // Agregar/quitar clase para resaltar los campos requeridos
  requiredFields.forEach((field) => {
    if (field === null) {
      field?.parentNode?.classList.add('highlight');
    } else {
      field?.parentNode?.classList.remove('highlight');
    }
  });

  // Mostrar ficha de planta solo si todos los campos requeridos están completos
  const plantCard = document.getElementById('plant-card');
  if (allFieldsCompleted) {
    const selectedAnswers = {
      placement,
      sunlight,
      pets,
      watering,
      style,
      extras,
    };
    const selectedPlant = findMatchingPlant(selectedAnswers);

    if (selectedPlant) {
      document.getElementById('plant-name').textContent = capitalizeFirstLetter(
        selectedPlant.name,
      );
      document.getElementById('soil').textContent = selectedPlant.soil;
      document.getElementById('pot').textContent = selectedPlant.pot;
      document.getElementById('color').textContent = selectedPlant.color;

      const extrasList = document.getElementById('extras');
      extrasList.innerHTML = '';
      if (selectedPlant.extras.length > 0) {
        selectedPlant.extras.forEach((extra) => {
          const li = document.createElement('li');
          li.textContent = extra;
          extrasList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'None';
        extrasList.appendChild(li);
      }

      // Mostrar imagen de la planta recomendada
      const plantImage = document.createElement('img');
      plantImage.src = `./Assets/${getImageFileName(selectedPlant.name)}`;
      plantImage.alt = selectedPlant.name;
      imageContainer.appendChild(plantImage);

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

function areAllFieldsCompleted(fields) {
  return fields.every((field) => field !== null);
}

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  form.reset();
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';
  document.getElementById('plant-card').style.display = 'none';
});
