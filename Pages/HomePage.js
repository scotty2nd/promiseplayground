let Context = require("Modules/Context");

let token = Context.status.map(function(x) { return x.token; }).inner();

function getMovies() {
	//Loading icon einblenden
	LoadingPanel.startLoading();

		Context.getMovies()
		.then(function(response){

			//Loading icon ausblenden
			LoadingPanel.stopLoading();
		})
		.catch(function(error) {
			//Loading icon ausblenden
			LoadingPanel.stopLoading();
		});
	
}

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

	token: token,
	LoadingPanel, LoadingPanel,

	goToHike: goToHike,
	goToMovieDetails: goToMovieDetails,
	goToRegister: goToRegister,
	getMovies: getMovies
};