let Context = require("Modules/Context");

function goToHike(arg) {
	let hike = arg.data;
	router.push("editHike", hike);
}

function goToMovieDetails(arg) {
	let movie = arg.data;
	router.push("showMovieDetails", movie);
}

function goToRegister() {
	router.push("register");
}

//console.log('Observable');
//console.log(JSON.stringify(Context.movies));

module.exports = {
	hikes: Context.hikes,
	movies: Context.movies,

	goToHike: goToHike,
	goToMovieDetails: goToMovieDetails,
	goToRegister: goToRegister
};