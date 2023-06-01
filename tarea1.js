
import render from './modulos/render.js';
import  getRandomJoke from './modulos/apis.js';
import searchJokes from './modulos/searchJokes.js';

function initializeApp() {
  render(() => {
    const randomButton = document.getElementById('randomButton');
    randomButton.addEventListener('click', handleRandomButtonClick);

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearchFormSubmit);

    const selectedJokeLink = document.getElementById('selectedJokeLink');
    selectedJokeLink.addEventListener('click', handleSelectedJokeLinkClick);
  });
}

function handleRandomButtonClick() {
  getRandomJoke()
    .then((joke) => {
      localStorage.setItem('selectedJoke', joke); // Almacena el chiste en el localStorage
      window.location.href = 'ecomerse2.html'; // Redirecciona a la página eComerse
    })
    .catch((error) => {
      console.error(error);
    });
}





function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('searchTerm').value;
  searchJokes(searchTerm)
    .then((jokes) => {
      localStorage.setItem('selectedJoke', jokes[0] || ''); // Almacena el primer chiste en el localStorage
      window.location.href = 'ecomerse.html'; // Redirecciona a la página eComerse
    })
    .catch((error) => {
      console.error(error);
    });
}




function handleSelectedJokeLinkClick(event) {
  event.preventDefault();
  const selectedJoke = document.querySelector('#jokeList li');
  if (selectedJoke) {
    localStorage.setItem('selectedJoke', selectedJoke.textContent);
  }
  window.location.href = 'ecommerce.html';
}

initializeApp();

