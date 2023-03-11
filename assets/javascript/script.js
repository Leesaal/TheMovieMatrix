// Global Variables
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
// Options object witht the headers to access RapidAPI and Movie Database
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
	
};

// Create function to amend user input into url friendly format
	var imdbIDKey;
	var movieName = document.getElementById("searchQuery").value;
	movieName = movieName.trim(); //Trim whitespaces from the query
	movieName = movieName.replace(" ", "%20"); // Replaces spaces with %20
	console.log(movieName);

// First API call to The Movie Database for Title and imdbID

fetch("https://movie-database-alternative.p.rapidapi.com/?s="
+ movieName 
+ "&r=json&page=1", options)
// console.log(options);

// Parse the response to json
.then(function (response) {
	return response.json();
  })
  .then(function (data) {
	console.log(data);
 
	// Get Title from the first Search result
	var movieTitleResults = data.Search[0].Title;
	console.log(movieTitleResults);

	// Get the imdbIDKey from the first Search result

	var imdbIDKey = data.Search[0].imdbID;
	  console.log(imdbIDKey);
	

// Second API call to The Movie Database

		var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

		fetch("https://api.themoviedb.org/3/movie/"
		+ imdbIDKey
		+ "?api_key="
		+ secondAPIKey
		+ "&language=en-US")
	// Parse the response to json
		.then(function (response) {
			return response.json();
		  })
		  .then(function (data) {
			console.log(data);

// Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response

	movieTitle.textContent ="Movie Title: " + data.original_title;
	movieGenre.textContent = "Genre: " + data.genres[0].name;
	moviePlot.textContent = "Plot: " + data.overview;
	console.log(moviePlot);
	movieRating.textContent = "Rating: " + Math.round(data.popularity)+ "%";
	console.log(movieRating);
	movieRuntime.textContent ="Runtime: " + data.runtime + " minutes";
	moviePoster.setAttribute("src",posterURL+data.poster_path);


	//If no movie entered or name of movie is incorrect, send alert (to be replaced by module) to enter a name of movie

	if (movieName === "" || movieName === null) {
		//send alert (to be replaced by module) if search is incorrect or empty
		alert("Enter name of the Movie");
		event.preventDefault();
		console.log("It works");
	} else {
		// If movieName is valid, display currentMovie 

		searchHistory(movieName);
		currentMovie(movieName);
		console.log("it works");
	}
	return movieName;
		
	
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

