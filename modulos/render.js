function render(callback) {
  const appContainer = document.querySelector('#app');

  const content = `
    <h1>Chistes</h1>
    <button id="randomButton">Chiste Random</button>
    <form id="searchForm">
      <input type="text" id="searchTerm" placeholder="Buscar chistes" />
      <button type="submit">Buscar</button>
    </form>
    <ul id="jokeList"></ul>
  `;

  appContainer.innerHTML = content;

  callback();
}

export default render;
