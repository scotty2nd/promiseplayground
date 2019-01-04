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


function compareByTitle(a,b) {
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}

function validateEmail(email) {
  let result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return result.test(email);
}

function checkPassword(strPassword) {
	// Reset combination count
	var nScore = 0;
	const m_strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		  m_strLowerCase = "abcdefghijklmnopqrstuvwxyz",
		  m_strNumber = "0123456789",
		  m_strCharacters = "!@#$%^&*?_~";

	// Password length
	if (strPassword.length < 5) {
		// Less than 4 characters
	    nScore += 5;
	}else if (strPassword.length > 4 && strPassword.length < 8) {
	    // 5 to 7 characters
	    nScore += 10;
	}else if (strPassword.length > 7) {
		// 8 or more
	    nScore += 25;
	}

	// Letters
	var nUpperCount = countContain(strPassword, m_strUpperCase),
		nLowerCount = countContain(strPassword, m_strLowerCase),
		nLowerUpperCount = nUpperCount + nLowerCount;

	if (nUpperCount == 0 && nLowerCount != 0) {
		// Letters are all lower case 
	    nScore += 10; 
	}else if (nUpperCount != 0 && nLowerCount != 0) {
	    // Letters are upper case and lower case 
	    nScore += 20; 
	}

	// Numbers
	var nNumberCount = countContain(strPassword, m_strNumber);

	if (nNumberCount == 1) {
	    // 1 number
	    nScore += 10;
	}

	if (nNumberCount >= 3) {
		// 3 or more numbers
	    nScore += 20;
	}

	// Characters
	var nCharacterCount = countContain(strPassword, m_strCharacters);

	// 1 character
	if (nCharacterCount == 1) {
	    nScore += 10;
	}   

	// More than 1 character
	if (nCharacterCount > 1) {
	    nScore += 25;
	}

	// Bonus for combination
	// Letters and numbers
	if (nNumberCount != 0 && nLowerUpperCount != 0) {
	    nScore += 2;
	}

	// Letters, numbers, and characters
	if (nNumberCount != 0 && nLowerUpperCount != 0 && nCharacterCount != 0) {
	    nScore += 3;
	}

	// Mixed case letters, numbers, and characters
	if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0 && nCharacterCount != 0) {
	    nScore += 5;
	}

	return nScore;
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck) { 
    // Declare variables
    var nCount = 0;

    for (let i = 0; i < strPassword.length; i++) {
        if (strCheck.indexOf(strPassword.charAt(i)) > -1) { 
        	nCount++;
        } 
    } 

    return nCount; 
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