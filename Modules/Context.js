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


//Sortiert das ein Objekt nach title
function compareByTitle(a,b) {
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}

// Prüft eine Email und gibt true/false zurück
function validateEmail(email) {
  let result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return result.test(email);
}

// Prüft ein Passwort auf Stärke und gibt einen Wert(score) zurück
function checkPassword(strPassword) {
	let score = 0;
	const strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		  strLowerCase = "abcdefghijklmnopqrstuvwxyz",
		  strNumber = "0123456789",
		  strCharacters = "!@#$%^&*?_~";

	// Passwortlänge prüfen
	if (strPassword.length < 5) {
		// weniger als 4 Zeichen
	    score += 5;
	}else if (strPassword.length > 4 && strPassword.length < 8) {
	    // 5 - 7 Zeichen
	    score += 10;
	}else if (strPassword.length > 7) {
		// mehr als 8 Zeichen
	    score += 25;
	}

	// Buchstaben
	let upperCount = countContain(strPassword, strUpperCase),
		lowerCount = countContain(strPassword, strLowerCase),
		lowerUpperCount = upperCount + lowerCount;

	if (upperCount == 0 && lowerCount != 0) {
		// Buchstaben alle klein geschrieben
	    score += 10; 
	}else if (upperCount != 0 && lowerCount != 0) {
	    // Buchstaben groß und klein geschrieben
	    score += 20; 
	}

	// Zahlen
	let numberCount = countContain(strPassword, strNumber);

	if (numberCount == 1) {
	    // eine Zahl
	    score += 10;
	}

	if (numberCount >= 3) {
		// mehr als 3 Zahlen
	    score += 20;
	}

	// Sonderzeichen
	var characterCount = countContain(strPassword, strCharacters);

	// 1 Sonderzeichen
	if (characterCount == 1) {
	    score += 10;
	}   

	// Mehr als 1 Sonderzeichen
	if (characterCount > 1) {
	    score += 25;
	}

	// Bonus für Kombinationen
	// Buchstaben und Zahlen
	if (numberCount != 0 && lowerUpperCount != 0) {
	    score += 2;
	}

	// Kleine Buchstaben, Zahlen und Sonderzeichen
	if (numberCount != 0 && lowerUpperCount != 0 && characterCount != 0) {
	    nScore += 3;
	}

	// Kleine und Große Buchstaben, Zahlen und Sonderzeichen
	if (numberCount != 0 && upperCount != 0 && lowerCount != 0 && characterCount != 0) {
	    score += 5;
	}

	return score;
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck) { 
    // Declare variables
    let count = 0;

    for (let i = 0; i < strPassword.length; i++) {
        if (strCheck.indexOf(strPassword.charAt(i)) > -1) { 
        	count++;
        } 
    } 

    return count; 
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
	registerUser: registerUser,
	validateEmail: validateEmail,
	checkPassword: checkPassword

};