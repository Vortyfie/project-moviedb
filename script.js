const API_KEY = 'api_key=896ad225e0620654ed8044bc37bb6e08';
const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2022-12-00&primary_release_date.lte=2023-01-30' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';


const main = document.getElementById('main');
const form = document.getElementById('form');

getMovies('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-12-01&primary_release_date.lte=2023-01-30&api_key=896ad225e0620654ed8044bc37bb6e08&language=fr');
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);
    })
    .catch(error => console.error(error));
}

function showMovies(data) {
  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Description</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


// Clé d'API (v3 auth) :               896ad225e0620654ed8044bc37bb6e08
// Exemple de demande d'API :          https://api.themoviedb.org/3/movie/550?api_key=896ad225e0620654ed8044bc37bb6e08
// What movies are in theatres? URL:   /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22

