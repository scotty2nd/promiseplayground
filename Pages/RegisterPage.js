let Context = require("Modules/Context");

let email = Context.user.map(function(x) { return x.email; }).inner();
let password = Context.user.map(function(x) { return x.password; }).inner();
let message = Context.status.map(function(x) { return x.message; }).inner();
let token = Context.status.map(function(x) { return x.token; }).inner();
let error = Context.status.map(function(x) { return x.error; }).inner();

function goBack() {
	router.goBack();
}

function register() {
	// Default Werte setzen
	message.value = "";
	token.value = "";
	error.value = true;

	// Email Feld Validierung in Komponent aufrufen
	EmailInput.validate();
	// Passwort Validierung in Komponent aufrufen
	PasswordInput.validate();

	if( EmailInput.validate() && PasswordInput.validate() ){
		//Loading icon einblenden
		LoadingPanel.startLoading();

		setTimeout(function(){

		// User Daten an registerUser Funktion übergeben
		Context.registerUser(email.value, password.value)
			.then(function(response){
				let token = response.token;

				if(typeof token !== "undefined"){

					// Set Input to Default Style
					EmailInput.clear();
					EmailInput.setDefaultStroke();
					PasswordInput.clear();
					PasswordInput.setDefaultStroke();

					email.value = "";
					password.value = "";

					//Loading icon ausblenden
					LoadingPanel.stopLoading();
				}
			})
			.catch(function(error) {
				//Loading icon ausblenden
				LoadingPanel.startLoading();
				console.log("Couldn't get register token: " + error);
			});

		}, 10000);
	}
}

module.exports = {
	email: email,
	password: password,
	token: token,
	message: message,
	error: error,

	goBack: goBack,
	register: register
};
