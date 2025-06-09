//Dark mode swithc
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const icon = document.getElementById("darkModeIcon");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-toggle-on");
        icon.classList.add("fa-toggle-off");
    } else {
        icon.classList.remove("fa-toggle-off");
        icon.classList.add("fa-toggle-on");
    }
}

//API
const API_KEY = '37c7b5ee9715374b9d06ee42d5931a13';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const movieContainer = document.getElementById('movies');
        data.results.forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-card');

            movieEl.innerHTML = `
        <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      `;
            movieContainer.appendChild(movieEl);
        });
    })
    .catch(error => console.error('Error fetching movies:', error));


