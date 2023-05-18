import { render } from './modulos/render';
import { getRandomJoke } from './modulos/apis';
import { searchJokes } from './modulos/searchJokes';


render();

const randomButton = document.querySelector("#randomButton");
const searchForm = document.querySelector("#searchForm");

randomButton.addEventListener("click", () => {
  getRandomJoke()
    .then(joke => {
      const jokeList = document.querySelector("#jokeList");
      jokeList.innerHTML = `<li>${joke}</li>`;
    })
    .catch(error => {
      console.log(error);
    });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const searchTerm = document.querySelector("#searchTerm").value;
  if (!searchTerm) {
    return;
  }
  
  searchJokes(searchTerm)
    .then(results => {
      const jokeList = document.querySelector("#jokeList");
      
      if (results.length === 0) {
        jokeList.innerHTML = "<li>No hubo resultados</li>";
      } else {
        jokeList.innerHTML = results
          .map(joke => `<li>${joke}</li>`)
          .join("");
      }
    })
    .catch(error => {
      console.log(error);
    });
});
