let apiUrl = 'https://reqres.in';

//To Do: mit Context.js registerUser zusammenführen. Mal ausprobieren.
function sendLoginRequest(user) {
	console.log('sendLoginRequest');
	console.dir(user);

	const options = {
		method: 'POST',
		body: JSON.stringify(user),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}

	/*Test User: eve.holt@reqres.in*/
	return fetch(apiUrl + '/api/login', options)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			return data;
		})
		.catch((error) => console.error(error));
}

/**
 * Original Example
**/

let hikes = [
	{
		id: 0,
		name: "Tricky Trails",
		location: "Lakebed, Utah",
		distance: 10.4,
		rating: 4,
		comments: "This hike was nice and hike-like. Glad I didn't bring a bike."
	},
	{
		id: 1,
		name: "Mondo Mountains",
		location: "Black Hills, South Dakota",
		distance: 20.86,
		rating: 3,
		comments: "Not the best, but would probably do again. Note to self: don't forget the sandwiches next time."
	},
	{
		id: 2,
		name: "Pesky Peaks",
		location: "Bergenhagen, Norway",
		distance: 8.2,
		rating: 5,
		comments: "Short but SO sweet!!"
	},
	{
		id: 3,
		name: "Rad Rivers",
		location: "Moriyama, Japan",
		distance: 12.3,
		rating: 4,
		comments: "Took my time with this one. Great view!"
	},
	{
		id: 4,
		name: "Dangerous Dirt",
		location: "Cactus, Arizona",
		distance: 19.34,
		rating: 2,
		comments: "Too long, too hot. Also that snakebite wasn't very fun."
	},
	{
		id: 5,
		name: "Dangerous Berg",
		location: "Irgendwo, Deutschland",
		distance: 19.34,
		rating: 1,
		comments: "Lorem ipsum"
	}
];
function getHikes() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() { 					// Nur zum Delay testen / Optional
			resolve(hikes);
		}, 0);
	});
}

function updateHike(id, name, location, distance, rating, comments) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {// Nur zum Delay testen // Optional

			for (let hike of hikes) {

				if (hike.id == id) { 				//wenn id gleich dann dann hike Object aktualisieren
					hike.name = name;
					hike.location = location;
					hike.distance = distance;
					hike.rating = rating;
					hike.comments = comments;
					break;
				}
			}

			resolve();
		}, 0);
	});

}

module.exports = {
	sendLoginRequest: sendLoginRequest,
	getHikes: getHikes,
	updateHike: updateHike
};