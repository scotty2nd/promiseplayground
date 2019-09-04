let Context = require("Modules/Context");

//let token = Context.status.map(function(x) { return x.token; }).inner();

function init() {
	console.log('init loading');
	
	//Loading icon einblenden
	LoadingPanel.startLoading();

	checkLoginTokenExist()
		.then(function(token){
			console.dir('token ' + token);

			//Loading icon ausblenden
			LoadingPanel.stopLoading();

			if(token) {
				console.log(token);
				router.push("home");
			}else {
				console.log(token);
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
	let FileSystem = require("FuseJS/FileSystem"),
		path = FileSystem.dataDirectory + "/" + "token.tmp";

	return FileSystem.readTextFromFile(path)
	.then(function(data) {
        console.dir("the read file content was " + data);
        return true;

    })
    .catch(function(error) {
        console.log("Unable to read file due to error:" + error);
        return false;
    });
}

module.exports = {
	init: init,
	checkLoginTokenExist: checkLoginTokenExist
};