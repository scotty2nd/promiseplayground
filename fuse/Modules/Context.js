let Observable = require("FuseJS/Observable"),
	Backend = require("./Backend");

let movies = Observable(),
	email = Observable(),
	password = Observable(),
	userToken = Observable(),
	userId = Observable(),
	errorMessage = Observable(),
	status = Observable({ error: true, message: "", token: "" }),
	baseImageUrl = 'http://image.tmdb.org/t/p/w780',
	apiUrl = 'https://reqres.in';

function getMovies() {
	console.log('Context get Movies');
	// getMovies returns a promise with a array of movie objects
	let current_year = new Date().getFullYear();

	return fetch('http://api.themoviedb.org/3/discover/movie?api_key=7aaf5378d6e8d9175dd95506a8882468&language=de-DE&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_year='+ current_year)
		.then(function(response){
			if (!response.ok) {
				throw new Error("HTTP error, status = " + response.status);
			}else {
				return response.json();
			}
		})
		.then(function(data){
			var sortedResponse = data.results.sort(compareByTitle);

			// JSON Response Objekt in Observable kopieren
			movies.replaceAll(sortedResponse);
		})
		.catch(function(error) {
			console.log("Couldn't get movies: " + error);
		});
}

function registerUser(email, password) {
	console.log('register user');
	let currentUser = {email: email, password: password};

	const options = {
		method: 'POST',
		body: JSON.stringify(currentUser),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	};

	/*Test User: eve.holt@reqres.in*/
	return fetch(apiUrl + '/api/register', options)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			if(data.token) {
				clearErrorMessage();
				userToken.value = data.token;
				userId.value = data.id;
				return true;
			}else {
				console.log(data.error);
				errorMessage.value = data.error;
				return false
			}
		})
		.catch(function(error) {
			console.log("Couldn't register user: " + error);
			return false;
		});
}

function loginUser(email, password) {
	//UserData in Obervable Object schreiben
	user.value.email = email;
	user.value.password = password;

	//User Daten ans Backend schicken und response verarbeiten
	return Backend.sendLoginRequest(user.value)
		.then(function(response){
			if(response.token){
				status.value = {
					error: false,
					message: "Login Successfull",
					token: response.token
				};

				return response;
			}else {
				status.value = {
					error: response.error,
					message: "Login failed",
					token: ""
				};

				return response;
			}
		})
		.catch(function(error) {
			console.log("Couldn't login user: " + error);
		});
}

function clearErrorMessage() {
	errorMessage.clear();
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
	email: email,
	password: password,
	userToken: userToken,
	userId: userId,
	errorMessage: errorMessage,
	baseImageUrl: baseImageUrl,

	updateHike: updateHike,
	registerUser: registerUser,
	clearErrorMessage: clearErrorMessage,
	loginUser: loginUser,
	getMovies: getMovies

};