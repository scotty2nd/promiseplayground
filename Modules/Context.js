let Observable = require("FuseJS/Observable");
let Backend = require("./Backend");

let movies = Observable();
let user = Observable();

let baseImageUrl = 'http://image.tmdb.org/t/p/w780';

// getMovies returns a promise with a array of movie objects
Backend.getMovies()
	.then(function(response) {
		var sortedResponse = response.results.sort(compareByTitle);

		movies.replaceAll(sortedResponse);
	})
	.catch(function(error) {
		console.log("Couldn't get movies: " + error);
	});

function compareByTitle(a,b) {
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}

function registerUser(email, password) {
	const user = {
    	email: email,
    	password: password
	}

	Backend.sendRegisterRequest(user)
		.catch(function(error) {
			console.log("Couldn't register user: " + email);
		});
}

/**
 * Original Example
**/

let hikes = Observable();

/*getHikes returns a promise with hike an object*/
Backend.getHikes()
	.then(function(newHikes) {
		hikes.replaceAll(newHikes);
	})
	.catch(function(error) {
		console.log("Couldn't get hikes: " + error);
	});

function updateHike(id, name, location, distance, rating, comments) {
	/*Hier kein for of möglich da über observable iteriert wird*/
	for (let i = 0; i < hikes.length; i++) {
		let hike = hikes.getAt(i);

		if (hike.id == id) {
			hike.name = name;
			hike.location = location;
			hike.distance = distance;
			hike.rating = rating;
			hike.comments = comments;
			hikes.replaceAt(i, hike);
			break;
		}
	}

	Backend.updateHike(id, name, location, distance, rating, comments)
		.catch(function(error) {
			console.log("Couldn't update hike: " + id);
		});
}

module.exports = {
	Observable: Observable,

	hikes: hikes,
	movies: movies,
	user: user,
	baseImageUrl: baseImageUrl,

	updateHike: updateHike,
	registerUser: registerUser
};