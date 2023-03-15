// Global Variables
var moviePoster = document.getElementById('moviePoster');
var movieTitle = document.getElementById('movieTitle');
var searchBtn = document.getElementById("searchBtn");
var moviePlot = document.getElementById('moviePlot');
var movieRating = document.getElementById('movieRating');
var movieRuntime = document.getElementById('movieRuntime');
var movieGenre = document.getElementById('movieGenre');
var main = document.querySelector('main');
var posterURL = "https://image.tmdb.org/t/p/w500/";
savedSearches= [];
// Modal variables
var modal = document.querySelector(".modal");
var modalBtn = document.getElementById("searchBtn");
var spanModal = document.getElementsByClassName("close")[0]; //close modal



// Event listener when click on the button from the search form 
searchBtn.addEventListener("click", function (event){
	event.preventDefault();
// Create movieName variable to get user's input value
	var movieName = document.getElementById("searchQuery").value;

// Show modal if search is empty or invalid
	if (movieName === "" || movieName === null) {
		modal.classList.remove("hide");

		// When the user clicks on <span> (x), close the modal
		spanModal.onclick = function() {
		modal.classList.add("hide");
		}

		event.preventDefault();
	} else {

// If movieName is valid, call searchMovie function and unhide main to show movie elements
	main.classList.remove("hide");

	searchMovie(movieName);

	}
});



	//  API Calls to Movie Database: this Function will make 2 API calls; from the first response we obtain the movie title and imdbIDKey, from the second call we get information about the movie like the rating and plot. This function will also display a message on the screen if the input is empty or incorrect

	function searchMovie (movieName){
		// Options object with the headers to access RapidAPI and Movie Database
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
				'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
			}	
		};	


		
	// First API call to The Movie Database Alternative for Title and imdbID

	fetch("https://movie-database-alternative.p.rapidapi.com/?s="
		+ movieName 
		+ "&r=json&page=1", options) 

	// Parse the response to json
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
console.log(data);
	// check input is valid
			if (data.hasOwnProperty("Search")) {

	// Get Title from the first Search result
		var movieTitleResults = data.Search[0].Title;

	// Get the imdbIDKey from the first Search result
		var imdbIDKey = data.Search[0].imdbID;
		
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
		
	// Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response
		console.log(data);
		movieTitle.textContent =data.original_title;
		movieGenre.textContent = data.genres[0].name;
		moviePlot.textContent = data.overview;
		movieRating.textContent = Math.round(data.popularity)+ "%";
		
		movieRuntime.textContent = data.runtime + " minutes";
		moviePoster.setAttribute("src",posterURL+data.poster_path);	
		videoSearch(youtubeAPIKey, movieName);
		searchHistory(movieName);		
		});

		// show modal if input is not a valid movie name
			} else {
				modal.classList.remove("hide");
				spanModal.onclick = function() {
				modal.classList.add("hide");
				}
		}}
		)};
	


		// API Call to get Video Trailer //

		var youtubeAPIKey = "AIzaSyCwgbAu1Gc2IwjwgERI4QF7O9pogMLMmo4";
		searchBtn.addEventListener("click", function(event) {
			event.preventDefault();
		
			var movieName = document.getElementById("searchQuery").value;
			movieName = movieName.trim();
			movieName = movieName.replace(" ", "%20");
			videoSearch(youtubeAPIKey, movieName);
		});
		
		function videoSearch(API, search) {
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





	// Search history list of the movies. It will also save the array of savedSearches on the local storage
		
		function searchHistory(movieName) {
	// Remove existing search history entries that contain the current movieName
			document.querySelectorAll('.past-search[data-movie-name="' + movieName + '"]').forEach(function(elem) {
			elem.remove();
			});
		
	// Create new search history entry
			var searchHistoryEntry = document.createElement("p");
			searchHistoryEntry.classList.add("past-search");
			searchHistoryEntry.setAttribute("data-movie-name", movieName);
			searchHistoryEntry.textContent = movieName;
		
			searchHistoryEntry.addEventListener("click", function(){
				searchMovie(movieName);
				searchHistory(movieName);
			})
				
	// Container for movie entry: create <div> element with a "past-search-container" class and append movie entry to the Container
			var searchEntryContainer = document.createElement("div");
			searchEntryContainer.classList.add("past-search-container");
			searchEntryContainer.append(searchHistoryEntry);
		
	// Append Container for movie to Search History Container Element
			var searchHistoryContainerEl = document.getElementById("search-history-container");
			searchHistoryContainerEl.append(searchEntryContainer);
		
	// The current movieName is pushed onto the savedSearches array, and the updated array is stored in local storage
			savedSearches.push(movieName);
			localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
		
	//Checks if there are any saved searches in local storage
			if (savedSearches.length > 0){
	// If there are saved searches, parse them from a JSON string back into an array
			var previousSavedSearches = localStorage.getItem("savedSearches");
			savedSearches = JSON.parse(previousSavedSearches);
			}
		
	// Clear search Query field
			document.getElementById("searchQuery").value = "";
		};
		

		
	// Load saved search history entries from local storage and display it to the search history container
		
	    function loadSearchHistory (movieName) {
			// Get from local storage saved search history and assign it to the savedSearchHistory variable
			var savedSearchHistory = localStorage.getItem("savedSearches");
		
			// If there is no previous saved searches, return false (no search history data to display)
			if (!savedSearchHistory) {
				return false;
			}
		
			// Convert saved search history string into array
			savedSearchHistory = JSON.parse(savedSearchHistory);
		
			// For loop savedSearchHistory array and make entry for each item in the list
			for (var i = 0; i < savedSearchHistory.length; i++) {
				searchHistory(savedSearchHistory[i]);
			}
		};














































	// // Youtube API key and var for selecting div for videos
	// // when one API key does not work, comment the one out and use the other
	// var youtubeAPIKey = "AIzaSyDHsLb_SBg7wWIzPQuf-8DLQcGRS7oOHrY";
	// // var youtubeAPIKey = "AIzaSyD1d0IlIgmBa6d4rpnQmNGZxktmqOrQ3b8";
	// var youtubeAPIKey = "AIzaSyCwgbAu1Gc2IwjwgERI4QF7O9pogMLMmo4";


	// // Add event listener for button

	// searchBtn.addEventListener("click", function(event) {
	// 	event.preventDefault();

	// 	var movieName = document.getElementById("searchQuery").value;
	// 	movieName = movieName.trim();
	// 	movieName = movieName.replace(" ", "%20");
	// 	videoSearch(youtubeAPIKey, movieName);
	// });


	// // Create fetch using "movie trailer" in the query to specify youtube request

	// function videoSearch(APIkey, search) {

	// 	fetch("https://www.googleapis.com/youtube/v3/search?key="
	// 	+ youtubeAPIKey
	// 	+ "&type=video&part=snippet&maxResults=1&q=movie%20trailer%20"
	// 	+ search
	// 	)

	// 	.then(response => response.json())

	// 	.then(data => this.displayVideo(data));
	// }

	// function displayVideo(data) {
	// 	var { videoId } = data.items[0].id;
	// 	document.getElementById("trailer").src = 'https://www.youtube.com/embed/' + videoId ;
		
	// }



	// //  This Function will make 2 API calls; from the first response we obtain the movie title and imdbIDKey, from the second call we get information about the movie like the rating and plot. This function will also display a message on the screen if the input is empty or incorrect

	// function searchMovie (movieName){
	// 	event.preventDefault();

	// 	//If no movie entered or name of movie is incorrect, send alert (to be replaced by module) to enter a name of movie

	// 	var movieName = document.getElementById("searchQuery").value;

	// 	if (movieName === "" || movieName === null) {
	// 		//send alert (to be replaced by module) if search is incorrect or empty
	// 		alert("Enter name of the Movie");
	// 		event.preventDefault();
	// 		console.log("It works");
	// 	} else {

	// // If movieName is valid, display searchHistory function

	// 		searchHistory(movieName);
	// 		console.log("It works");
	// 	}
		
	// // Options object witht the headers to access RapidAPI and Movie Database
	// const options = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
	// 		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	// 	}	
	// };


	// // Create function to amend user input into url friendly format
	// 	var imdbIDKey;
	// 	movieName = movieName.trim(); //Trim whitespaces from the query
	// 	movieName = movieName.replace(" ", "%20"); // Replaces spaces with %20
	// 	console.log(movieName);


	// // First API call to The Movie Database for Title and imdbID

	// fetch("https://movie-database-alternative.p.rapidapi.com/?s="
	// + movieName 
	// + "&r=json&page=1", options)
	// // console.log(options);

	// // Parse the response to json
	// .then(function (response) {
	// 	return response.json();
	// })
	// .then(function (data) {
	// 	console.log(data);
	
	// 	// Get Title from the first Search result
	// 	var movieTitleResults = data.Search[0].Title;
	// 	console.log(movieTitleResults);

	// 	// Get the imdbIDKey from the first Search result

	// 	var imdbIDKey = data.Search[0].imdbID;
	// 	console.log(imdbIDKey);
		

	// // Second API call to The Movie Database

	// 		var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

	// 		fetch("https://api.themoviedb.org/3/movie/"
	// 		+ imdbIDKey
	// 		+ "?api_key="
	// 		+ secondAPIKey
	// 		+ "&language=en-US")

	// // Parse the response to json
	// 		.then(function (response) {
	// 			return response.json();
	// 		})
	// 		.then(function (data) {
	// 			console.log(data);

	// // Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response

	// 	movieTitle.textContent ="Movie Title: " + data.original_title;
	// 	movieGenre.textContent = "Genre: " + data.genres[0].name;
	// 	moviePlot.textContent = "Plot: " + data.overview;
	// 	console.log(moviePlot);
	// 	movieRating.textContent = "Rating: " + Math.round(data.popularity)+ "%";
	// 	console.log(movieRating);
	// 	movieRuntime.textContent ="Runtime: " + data.runtime + " minutes";
	// 	moviePoster.setAttribute("src",posterURL+data.poster_path);

	// });
	// });
	// };

	// // Added Event Listener to searchBtn to call searchMovie function
	// searchBtn.addEventListener("click", searchMovie);




	// // Create a search history list of the movies. It will also save the array of savedSearches on the local storage
	// function searchHistory(movieName) {
	// 	// Remove existing search history entries that contain the current movieName
	// 	document.querySelectorAll('.past-search[data-movie-name="' + movieName + '"]').forEach(function(elem) {
	// 	elem.remove();
	// 	});
	
	// 	// Create new search history entry
	// 	var searchHistoryEntry = document.createElement("p");
	// 	searchHistoryEntry.classList.add("past-search");
	// 	searchHistoryEntry.setAttribute("data-movie-name", movieName);
	// 	searchHistoryEntry.textContent = movieName;

	// 	searchHistoryEntry.addEventListener("click", function(){
	// 		searchMovie(movieName);
	// 		searchHistory(movieName);
	// 	});
	
	
	// 	// Container for movie entry: create <div> element with a "past-search-container" class and append movie entry to the Container
	// 	var searchEntryContainer = document.createElement("div");
	// 	searchEntryContainer.classList.add("past-search-container");
	// 	searchEntryContainer.append(searchHistoryEntry);
	
	// 	// Append Container for movie to Search History Container Element
	// 	var searchHistoryContainerEl = document.getElementById("search-history-container");
	// 	searchHistoryContainerEl.append(searchEntryContainer);
	
	// 	// The current movieName is pushed onto the savedSearches array, and the updated array is stored in local storage
	// 	savedSearches.push(movieName);
	// 	localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
	
	// 	//Checks if there are any saved searches in local storage
	// 	if (savedSearches.length > 0){
	// 	// If there are saved searches, parse them from a JSON string back into an array
	// 	var previousSavedSearches = localStorage.getItem("savedSearches");
	// 	savedSearches = JSON.parse(previousSavedSearches);
	// 	}
	
	// 	// Clear search Query field
	// 	document.getElementById("searchQuery").value = "";
	// };
	

	// // Load saved search history entries from local storage and display it to the search history container
	// function loadSearchHistory (movieName) {
	// 	// Get from local storage saved search history and assign it to the savedSearchHistory variable
	// 	var savedSearchHistory = localStorage.getItem("savedSearches");

	// 	// If there is no previous saved searches, return false (no search history data to display)
	// 	if (!savedSearchHistory) {
	// 		return false;
	// 	}

	// 	// Convert saved search history string into array
	// 	savedSearchHistory = JSON.parse(savedSearchHistory);

	// 	// For loop savedSearchHistory array and make entry for each item in the list
	// 	for (var i = 0; i < savedSearchHistory.length; i++) {
	// 		searchHistory(savedSearchHistory[i]);
	// 	}
	// };




