let Context = require("Modules/Context");
let hike = this.Parameter;

let name = hike.map(function(x) { return x.name; });
let location = hike.map(function(x) { return x.location; });
let distance = hike.map(function(x) { return x.distance; });
let rating = hike.map(function(x) { return x.rating; });
let comments = hike.map(function(x) { return x.comments; });

let title = hike.map(function(x) { return x.title; });
let posterpath = hike.map(function(x) { return x.poster_path; });

let fullposterpath = Context.Observable(function() {
	return Context.baseImageUrl + '' + posterpath.value;
})

function save() {
	console.log('hike save');
	console.dir(hike.value);
	//console.dir(name.value);
	Context.updateHike(hike.value.id, name.value, location.value, distance.value, rating.value, comments.value);
	router.goBack();

}

function cancel() {
	//Reset Observable Value
	hike.value = hike.value;
	router.goBack();
}

module.exports = {
	name: name,
	location: location,
	distance: distance,
	rating: rating,
	comments: comments,
	title: title,
	posterpath: posterpath,
	fullposterpath: fullposterpath,

	save: save,
	cancel: cancel
};