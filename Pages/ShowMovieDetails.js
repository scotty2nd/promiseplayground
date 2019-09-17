let Context = require("Modules/Context"),
	movie = this.Parameter;

let title = movie.map(function(x) { return x.title; }),
	backdrop_path = movie.map(function(x) { return x.backdrop_path; }),
	overview = movie.map(function(x) { return x.overview; }),
	release_date = movie.map(function(x) { return x.release_date; });

let fullposterpath = Context.Observable(function() {
	// Wegen des Mappings ist die die Abfrage backdrop_path.value möglich
	return Context.baseImageUrl + '' + backdrop_path.value;
});

let formatedReleaseDate = Context.Observable(function() {
	let date = new Date(release_date.value);

	return date.getDate() + "/" +  (date.getMonth()+1) + "/" + date.getFullYear();
});

function goBack() {
	router.goBack();
}

module.exports = {
	title: title,
	overview: overview,
	releaseDate: release_date,
	fullposterPath: fullposterpath,
	formatedReleaseDate: formatedReleaseDate,

	goBack: goBack
};