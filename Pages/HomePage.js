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

function logout() {
	console.log('logout');

	let FileSystem = require("FuseJS/FileSystem"),
		path = FileSystem.dataDirectory + "/" + "token.tmp";

	return FileSystem.delete(path)
	    .then(function() {
	        console.log("Delete succeeded");
	        router.push("login");
	    }, function(error) {
	        console.log("Unable to delete file");
	    });
}

/*Kann demnächst weg da da auf die Login Seite verschoben wurde*/
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
	logout: logout,
	goToRegister: goToRegister,
	getMovies: getMovies
};