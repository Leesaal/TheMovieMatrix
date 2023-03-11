



















































































































































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

















