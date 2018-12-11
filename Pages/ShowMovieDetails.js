let Context = require("Modules/Context");
let hike = this.Parameter;

let title = hike.map(function(x) { return x.title; });
let posterpath = hike.map(function(x) { return x.poster_path; });
let backdrop_path = hike.map(function(x) { return x.backdrop_path; });
let overview = hike.map(function(x) { return x.overview; });


let fullposterpath = Context.Observable(function() {
	return Context.baseImageUrl + '' + backdrop_path.value;
})

function goBack() {
	router.goBack();
}

module.exports = {
	title: title,
	fullposterpath: fullposterpath,
	backdrop_path: backdrop_path,
	overview: overview,

	goBack: goBack
};