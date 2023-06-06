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
  
  export default getRandomJoke;
  