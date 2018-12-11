let Context = require("Modules/Context");

function goToHike(arg) {
	let hike = arg.data;
	router.push("editHike", hike);
}

//console.log('Observable');
//console.log(JSON.stringify(Context.movies));

module.exports = {
	hikes: Context.hikes,
	movies: Context.movies,

	goToHike: goToHike
};