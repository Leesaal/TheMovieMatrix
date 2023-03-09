const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

fetch('https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


console.log(options);

// API key - Youtube: AIzaSyDHsLb_SBg7wWIzPQuf-8DLQcGRS7oOHrY

    fetch('https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDHsLb_SBg7wWIzPQuf-8DLQcGRS7oOHrY&part=snippet,contentDetails,statistics,status')
	.then(response => response.json())
	.then(response => console.log(response));
	
