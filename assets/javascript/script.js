var moviePoster = document.getElementById('moviePoster');
var movieTitle = document.getElementById('movieTitle');
var searchBtn = document.getElementById("searchBtn");
var moviePlot = document.getElementById('moviePlot');
var movieRating = document.getElementById('movieRating');
var movieRuntime = document.getElementById('movieRuntime');
var movieGenre = document.getElementById('movieGenre');
var posterURL = "https://image.tmdb.org/t/p/w500/"

searchBtn.addEventListener("click", function(event) {
	event.preventDefault();

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
	
};

// create function to amend user input into url friendly format
	var imdbIDKey;
	var movieName = document.getElementById("searchQuery").value;
	movieName = movieName.trim();
	movieName = movieName.replace(" ", "%20");
	console.log(movieName);

// first movie database API for imdbID

fetch("https://movie-database-alternative.p.rapidapi.com/?s="
+ movieName 
+ "&r=json&page=1", options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// console.log(options);
.then(function (response) {
	return response.json();
  })
  .then(function (data) {
	console.log(data);
 
	var movieTitleResults = data.Search[0].Title;
	console.log(movieTitleResults);

	// var originalMovieName = document.getElementById("searchQuery").value.trim();
	//  if (movieTitleResults==originalMovieName) 
	var imdbIDKey = data.Search[0].imdbID;
	  console.log(imdbIDKey);
	

//second movie database API

		var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

		fetch("https://api.themoviedb.org/3/movie/"
		+ imdbIDKey
		+ "?api_key="
		+ secondAPIKey
		+ "&language=en-US")
		.then(function (response) {
			return response.json();
		  })
		  .then(function (data) {
			console.log(data);

	movieTitle.textContent ="Movie Title: " + data.original_title;
	movieGenre.textContent = "Genre: " + data.genres[0].name;
	moviePlot.textContent = "Plot: " + data.overview;
	console.log(moviePlot);
	movieRating.textContent = "Rating: " + Math.round(data.popularity)+ "%";
	console.log(movieRating);
	movieRuntime.textContent ="Runtime: " + data.runtime + " minutes";
	moviePoster.setAttribute("src",posterURL+data.poster_path);
		



	
});
});

});





// Youtube API key and var for selecting div for videos

var youtubeAPIKey = "AIzaSyD1d0IlIgmBa6d4rpnQmNGZxktmqOrQ3b8";


// add event listener for button

//var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function(event) {
	event.preventDefault();

	var searchQuery = document.getElementById("searchQuery").value;
	searchQuery = searchQuery.trim();
	searchQuery = searchQuery.replace(" ", "%20");
	console.log(searchQuery);

	videoSearch(youtubeAPIKey, searchQuery);
})


// create fetch using "movie trailer" in the query to specify youtube request

function videoSearch(APIkey, search) {
	fetch("https://www.googleapis.com/youtube/v3/search?key="
	+ youtubeAPIKey
	+ "&type=video&part=snippet&maxResults=1&q=movie%20trailer%20"
	+ search
	)

	.then(response => response.json())
	.then(data => this.displayVideo(data));
}

function displayVideo(data) {
	var { videoId } = data.items[0].id;
	document.getElementById("trailer").src = 'https://www.youtube.com/embed/' + videoId ;
	
}

