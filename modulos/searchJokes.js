function searchJokes(searchTerm) {
  return fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        return data.results.map((result) => result.joke);
      } else {
        return [];
      }
    })
    .catch((error) => {
      throw new Error("Ha ocurrido un error al buscar los chistes");
    });
}
export default searchJokes;
