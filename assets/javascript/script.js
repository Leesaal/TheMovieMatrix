const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

// create function to amend user input into url friendly format

var name = "White Chicks";
name = name.trim();
name = name.replace(" ", "%20");

// first movie database API for imdbID

fetch("https://movie-database-alternative.p.rapidapi.com/?s="
+ name 
+ "&r=json&page=1", options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


console.log(options);


// second movie database API

// var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

// fetch("https://api.themoviedb.org/3/movie/"
// + imdbID
// + "?api_key="
// + secondAPIKey
// + "&language=en-US")
// .then(response => response.json())
// .then(response => console.log(response));

// var posterURL = "https://image.tmdb.org/t/p/w500/";



// Youtube API key and var for selecting div for videos

var youtubeAPIKey = "AIzaSyD1d0IlIgmBa6d4rpnQmNGZxktmqOrQ3b8";


// add event listener for button

var searchBtn = document.getElementById("searchBtn");
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
