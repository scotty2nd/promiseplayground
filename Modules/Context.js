let Observable = require("FuseJS/Observable");
let Backend = require("./Backend");

let movies = Observable();
let user = Observable();
let status = Observable();

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
	console.log('regiter User');
	console.log(email);
	console.log(password);
	console.log('User Obervable alt');
	console.dir(user.value);
	console.log('Status Obervable alt');
	console.dir(status.value);

	if(password == ""){
		password = null;
	}

	if(email == ""){
		email = null;
	}

	const userData = {
    	email: email,
    	password: password
	}

	//UserData in Obervable schreiben
	user.value = userData;

	console.log('User Obervable aktualisiert');
	console.dir(user.value);

	//Erzeugt den gleichen output
	//console.dir(user._values[0].email);
	//console.dir(user.value.email);

	//User Daten ans Backend schicken und response verarbeiten
	Backend.sendRegisterRequest(userData)
		.then(function(response){
			console.dir(response);
			if(response.token){
				status.value = {
					token: response.token, 
					message: "Registration Successfull"
				};

			}else {
				status.value = {
					error: response.error, 
					message: "Registration failed"
				};
			}
			console.log('Status Obervable aktualisiert');
			console.dir(status.value);
		})
		.catch(function(error) {
			console.log("Couldn't register user: " + error);
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
	/*console.log('update hike');
	console.dir(hikes._values[0]);*/
	
	//Observable Werte aktualisieren
	//Hier kein for of möglich da über observable iteriert wird
	for (let i = 0; i < hikes.length; i++) {
		let hike = hikes.getAt(i);

		console.log(i);
		if (hike.id == id) {
			hike.name = name;
			hike.location = location;
			hike.distance = distance;
			hike.rating = rating;
			hike.comments = comments;
			hikes.replaceAt(i, hike);
			break;
		}
		//console.dir(hike.name);
	}

	//Formular Daten an die Api schicken
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
	status: status,
	baseImageUrl: baseImageUrl,

	updateHike: updateHike,
	registerUser: registerUser
};