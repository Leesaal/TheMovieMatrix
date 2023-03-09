//Global Variables



// Event Listener when click on the button from the search div
var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function (event){
	event.preventDefault();

	// Get movie searched

	var movieName = document.getElementById("search-input").value;
	

	//If no movie entered or name of movie is incorrect, send alert (to be replaced by module) to enter a name of movie

	if (movieName === "" || movieName === null) {
		//send alert (to be replaced by module) if search is incorrect or empty
		alert("Enter name of the Movie");
		event.preventDefault();
		console.log("It works");
	} else {
		// If movieName is valid, display currentMovie 

		currentMovie(movieName);
		console.log("it works");
	}
	return movieName;
}
)



function currentMovie (movieName) {
	
}








// // Create function to amend user input into url friendly format

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
// 		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
// 	}
// };

// 	 movieName = "White Chicks",
// movieName = movieName.trim(),
// movieName = movieName.replace(" ", "%20"),

// fetch("https://movie-database-alternative.p.rapidapi.com/?s=" + movieName + "&r=json&page=1", options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// console.log(options);






// // second movie database API

// var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

// fetch("https://api.themoviedb.org/3/movie/"
// + imdbID
// + "?api_key="
// + secondAPIKey
// + "&language=en-US")
// .then(response => response.json())
// .then(response => console.log(response));

// var posterURL = "https://image.tmdb.org/t/p/w500/";
// var test = 0;










