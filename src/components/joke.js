const jokeContainer = document.querySelector("#main-joke");

function setJoke(joke) {
  if (joke) {
    jokeContainer.textContent = joke;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");
setJoke(joke);

export default jokeContainer;
