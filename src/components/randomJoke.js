function getRandomJoke() {
    return fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data.joke)
      .catch((error) => {
        throw new Error("Ha ocurrido un error al obtener el chiste");
      });
  }
  const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  const jokeList = document.querySelector("#jokeList");
  jokeList.innerHTML = `<p>${joke}</p>`;
}

  export default getRandomJoke;
  