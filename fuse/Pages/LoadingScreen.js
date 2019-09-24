let Context = require("Modules/Context");
let FileSystem = require("FuseJS/FileSystem"),
	path = FileSystem.dataDirectory + "/" + "token.tmp";

function init() {
	console.log('init loading');
	
	//Loading icon einblenden
	LoadingPanel.startLoading();

	checkLoginTokenExist()
		.then(function(data){
			console.dir('Tokenfile ' + data);

			//Loading icon ausblenden
			LoadingPanel.stopLoading();

			if(data) {
				console.log('Tokenfile Exist: ' + data);
				router.push("home");
			}else {
				console.log('No Tokenfile Exist: ' + data);
				router.push("login");
			}
		})
		.catch(function(error) {
			//Loading icon ausblenden
			LoadingPanel.stopLoading();
			console.log("Error in checkologin " + error);
		});
}

function checkLoginTokenExist(){
	console.log('CheckLoginTokenFile');
	//console.log('Sync ' + FileSystem.existsSync(path) ? "Sync It's there!" : "Sync It's missing :/");

	if(FileSystem.existsSync(path)) {
		console.log("Sync It's there!");
	}else {
		console.log("Sync It's missing :/");
	}

	return FileSystem.exists(path)
		.then(function(file) {
			if(file) {
				console.log('Async it\'s there! =)');
				return true;
			}else {
				console.log("Async it's missing :/");
				return false;
			}
		}, function(error) {
			console.log("Unable to check if file exists");
			return false;
		});


	/*return FileSystem.readTextFromFile(path)
	.then(function(data) {
        console.dir("the read file content was " + data);
        return true;

    })
    .catch(function(error) {
        console.log("Unable to read file due to error:" + error);
        return false;
    });*/
}

module.exports = {
	init: init
};