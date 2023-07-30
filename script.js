// Array de plantas recomendadas
const plants = [
  {
    name: 'Low Light Plant',
    placement: 'Inside with some indirect light',
    sunlight: 'No',
    pets: 'Toxic',
    watering: 'Overwater',
    style: 'I like minimalism and material colors',
    extras: ['Moss pole'],
    soil: 'Easy Drainage Soil',
    pot: 'Clay pot - Substitute the soil for the easy drainage soil',
    color: 'clay'
  },
  {
    name: 'Medium Light Plant',
    placement: 'Inside with a lot of indirect light',
    sunlight: 'No',
    pets: 'Toxic',
    watering: 'Overwater',
    style: 'I like some decoration and simple colors',
    extras: ['Moss pole'],
    soil: 'Composted Soil',
    pot: 'Simple pot decorated',
    color: 'clay'
  },
  {
    name: 'Outdoor Plant',
    placement: 'Outside',
    sunlight: 'No',
    pets: 'Toxic',
    watering: 'Overwater',
    style: 'I like some decoration and simple colors',
    extras: ['Pebbles'],
    soil: 'Composted Soil',
    pot: 'Simple pot decorated',
    color: 'clay'
  },
  {
    name: 'Sansevieria',
    soil: 'Easy Drainage Soil',
    pot: 'Ceramic pot',
    color: 'yellow',
    extras: ['Moss pole'],
    toxic: true
  },
  {
    name: 'Boston Fern',
    soil: 'Composted Soil',
    pot: 'Ceramic pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: false
  },
  {
    name: 'Aglaonema',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'pink',
    extras: ['Moss pole'],
    toxic: true
  },
  {
    name: 'Monstera',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'blue',
    extras: ['Moss pole'],
    toxic: false
  },
  {
    name: 'Aloe Vera',
    soil: 'Fertilized Soil',
    pot: 'Ceramic pot',
    color: 'yellow',
    extras: ['Pebbles'],
    toxic: true
  },
  {
    name: 'Cactus',
    soil: 'Fertilized Soil',
    pot: 'Simple pot',
    color: 'yellow',
    extras: ['Pebbles'],
    toxic: false
  },
  // Plantas adicionales
  {
    name: 'Snake Plant',
    soil: 'Easy Drainage Soil',
    pot: 'Ceramic pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: true
  },
  {
    name: 'Peace Lily',
    soil: 'Composted Soil',
    pot: 'Simple pot decorated',
    color: 'white',
    extras: ['Pebbles', 'Mini Plants'],
    toxic: true
  },
  {
    name: 'Spider Plant',
    soil: 'Composted Soil',
    pot: 'Simple pot',
    color: 'green',
    extras: ['Moss pole'],
    toxic: false
  },
  // Agrega más plantas recomendadas según tus necesidades
];
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function areExtrasMatch(plantExtras, selectedExtras) {
  return plantExtras.every(extra => Array.from(selectedExtras).some(selectedExtra => selectedExtra.value === extra));
}

function findMatchingPlant(selectedAnswers) {
  return plants.find(plant => {
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
  console.log(imageContainer); // Agrega este console.log para verificar si el elemento se selecciona correctamente

  imageContainer.innerHTML = '';
  // Agregar/quitar clase para resaltar los campos requeridos
  requiredFields.forEach(field => {
    if (field === null) {
      field.parentNode.classList.add('highlight'); // Aquí se produce el error si field es null
    } else {
      field.parentNode.classList.remove('highlight');
    }
  });

  // Mostrar ficha de planta solo si todos los campos requeridos están completos
  const plantCard = document.getElementById('plant-card');
  if (allFieldsCompleted) {
    const selectedAnswers = { placement, sunlight, pets, watering, style, extras };
    const selectedPlant = findMatchingPlant(selectedAnswers);

    if (selectedPlant) {
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
        `./Assets/${selectedPlant.pot.toLowerCase().replace(/\s/g, '-')}.png`,
        `./Assets/${selectedPlant.name.toLowerCase().replace(/\s/g, '-')}.png`,
        `./Assets/${selectedPlant.soil.toLowerCase().replace(/\s/g, '-')}.png`,
        ...selectedPlant.extras.map(extra => `./Assets/${extra.toLowerCase().replace(/\s/g, '-')}.png`),
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

function areAllFieldsCompleted(fields) {
  return fields.every(field => field !== null);
}

const form = document.getElementById('plant-form');
form.addEventListener('submit', handleSubmit);

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  form.reset();
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';
  document.getElementById('plant-card').style.display = 'none';
});

