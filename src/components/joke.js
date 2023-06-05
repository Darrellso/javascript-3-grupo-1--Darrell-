const jokeContainer = document.querySelector("#main-joke");

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  jokeContainer.textContent = joke;
}

export default jokeContainer;
