let Observable = require("FuseJS/Observable");
let Backend = require("./Backend");

let movies = Observable();
let user = Observable({ email: "", password: "" });
let status = Observable({ error: true, message: "", token: "" });

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


function registerUser(email, password) {
	console.log('register User Context');

	//UserData in Obervable Object schreiben
	user.value.email = email;
	user.value.password = password;

	//User Daten ans Backend schicken und response verarbeiten
	Backend.sendRegisterRequest(user.value)
		.then(function(response){
			console.dir(response);	//später entfernen
			if(response.token){
				status.value = {
					error: false,
					message: "Registration Successfull",
					token: response.token
				};

			}else {
				status.value = {
					error: response.error, 
					message: "Registration failed",
					token: ""
				};
			}
		})
		.catch(function(error) {
			console.log("Couldn't register user: " + error);
		});
}

//Sortiert das ein Objekt nach title
function compareByTitle(a,b) {
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
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