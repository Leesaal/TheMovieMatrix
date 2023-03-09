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

fetch("https://movie-database-alternative.p.rapidapi.com/?s="
+ name 
+ "&r=json&page=1", options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


console.log(options);

// API key - Youtube: AIzaSyDHsLb_SBg7wWIzPQuf-8DLQcGRS7oOHrY

    fetch('https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDHsLb_SBg7wWIzPQuf-8DLQcGRS7oOHrY&part=snippet,contentDetails,statistics,status')
	.then(response => response.json())
	.then(response => console.log(response));
	
// second movie database API

var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

fetch("https://api.themoviedb.org/3/movie/"
+ imdbID
+ "?api_key="
+ secondAPIKey
+ "&language=en-US")
.then(response => response.json())
.then(response => console.log(response));

var posterURL = "https://image.tmdb.org/t/p/w500/";
















var leesa = "leesa";