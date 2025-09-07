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
const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

let currentPage = 1;
let isLoading = false;
const movieContainer = document.getElementById('movies');
const loadingCaption = document.createElement('div');
loadingCaption.id = 'loading-caption';
loadingCaption.textContent = 'Loading...';
loadingCaption.style.display = 'none';
document.body.appendChild(loadingCaption);

function fetchMovies(page = 1) {
    isLoading = true;
    loadingCaption.style.display = 'block';
    fetch(`${API_URL}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            data.results.slice(4).forEach(movie => {
                const movieEl = document.createElement('div');
                movieEl.classList.add('movie-card');
                movieEl.innerHTML = `
                    <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" style="cursor:pointer;">
                    <h3>${movie.title}</h3>
                    <p>⭐ ${movie.vote_average}</p>
                `;
                movieEl.onclick = () => {
                    window.location.href = `movie.html?id=${movie.id}`;
                };
                movieContainer.appendChild(movieEl);
            });
            isLoading = false;
            loadingCaption.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            isLoading = false;
            loadingCaption.style.display = 'none';
        });
}

fetchMovies(currentPage);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        currentPage++;
        fetchMovies(currentPage);
    }
});

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            movieContainer.innerHTML = '';
            loadingCaption.style.display = 'block';
            fetch(SEARCH_API_URL + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    if (data.results.length === 0) {
                        movieContainer.innerHTML = '<p>No movies found.</p>';
                    } else {
                        data.results.forEach(movie => {
                            const movieEl = document.createElement('div');
                            movieEl.classList.add('movie-card');
                            movieEl.innerHTML = `
                                <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" style="cursor:pointer;">
                                <h3>${movie.title}</h3>
                                <p>⭐ ${movie.vote_average}</p>
                            `;
                            movieEl.onclick = () => {
                                window.location.href = `movie.html?id=${movie.id}`;
                            };
                            movieContainer.appendChild(movieEl);
                        });
                    }
                    loadingCaption.style.display = 'none';
                })
                .catch(error => {
                    movieContainer.innerHTML = '<p>Error searching movies.</p>';
                    loadingCaption.style.display = 'none';
                });
        }
    });
}




