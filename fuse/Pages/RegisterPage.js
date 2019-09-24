let Context = require("Modules/Context");

function goBack() {
	router.goBack();
}

function registerClicked() {
	// Email Feld Validierung in Komponent aufrufen
	//EmailInput.validate();
	// Passwort Validierung in Komponent aufrufen
	PasswordInput.validate();

	if( EmailInput.validate() && PasswordInput.validate() ){
		//Loading icon einblenden
		LoadingPanel.startLoading();

		//Formular Daten an die Api schicken
		Context.registerUser(Context.email.value, Context.password.value)
			.then(function(response){
				//Loading icon ausblenden
				LoadingPanel.stopLoading();

				if(response) {
					// Set Input to Default Style
					EmailInput.clear();
					EmailInput.setDefaultStroke();
					PasswordInput.clear();
					PasswordInput.setDefaultStroke();
				}
			});
	}
}

/*
function saveTokenToFile(token) {
	console.log('saveToken');
	let FileSystem = require("FuseJS/FileSystem");
	let path = FileSystem.dataDirectory + "/" + "token.tmp";

	FileSystem.writeTextToFile(path, token);
}*/

module.exports = {
	email: Context.email,
	password: Context.password,
	userToken: Context.userToken,
	userId: Context.userId,
	errorMessage: Context.errorMessage,

	goBack: goBack,
	registerClicked: registerClicked
};
