// http://www.omdbapi.com/?i=tt3896198&apikey=8560a83e
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    // let searchTerm=movieSearchBox.value;
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=8560a83e`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
     console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
    else{
        resultGrid.innerHTML="";
        var div=document.createElement("div");
        var img=document.createElement("img");
        img.src="https://c.tenor.com/NpZyGNG3SLEAAAAM/this-content-is-not-available.gif"
        div.append(img);
        div.style.marginLeft="50%";
        div.style.marginRight="auto";
        div.style.minWidth="500px";
        resultGrid.append(div);
    }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    // console.log(searchTerm);
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[0].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[0].Poster != "N/A")
            moviePoster = movies[0].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[0].Title}</h3>
            <p>${movies[0].Year}</p>
        </div>
        `;
        //searchList.appendChild(movieListItem);
    
    loadMovieDetails(movieListItem.dataset.id);
}

function loadMovieDetails(movie){
    //const searchListMovies = searchList.querySelectorAll('.search-list-item');
    
        noname();
         async function noname() {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=8560a83e`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);

    };
};


function displayMovieDetails(details){
    resultGrid.innerHTML = `
    
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
    <h4 class="span"></h4>
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.imdbRating}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
    if(details.imdbRating>8.5) {
        var div=document.createElement("span")
        div.innerText="RECOMMENDED";
        div.style.color="green";
        document.querySelector(".span").append(div);
    }
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});