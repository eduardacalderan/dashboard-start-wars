function dashboard() {
  fillCounters();
  fillTable();

  /*preenchendo os contadores*/
  function fillCounters() {
    const characterCounter = document.querySelector("#characters");
    const moonCounter = document.querySelector("#moons");
    const planetCounter = document.querySelector("#planets");
    const shipCounter = document.querySelector("#ships");

    Promise.all([
      swapiGet("people/"),
      swapiGet("vehicles/"),
      swapiGet("planets/"),
      swapiGet("starships/"),
    ]).then(function (results) {
      characterCounter.innerHTML = results[0].data.count;
      moonCounter.innerHTML = results[1].data.count;
      planetCounter.innerHTML = results[2].data.count;
      shipCounter.innerHTML = results[3].data.count;
    });
  }

  async function fillTable() {
    const response = await swapiGet("films/");
    const tableData = response.data.results;

    tableData.forEach((film) => {
      $("#movies").append(`<tr>
    <td>${film.title}</td>
    <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
    <td>${film.director}</td>
    <td class="episode">${film.episode_id}</td>
    </tr>`);
    });
  }

  /*pegando swapi*/
  function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}/`);
  }
}
dashboard();
