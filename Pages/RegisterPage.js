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
	// Email Feld Validierung in Komponent aufrufen
	EmailInput.validate();
	// Passwort Validierung in Komponent aufrufen
	PasswordInput.validate();

	if( EmailInput.validate() && PasswordInput.validate() ){
		console.log('token in register');
		// User Daten an registerUser Funktion übergeben
		Context.registerUser(email.value, password.value)
			.then(function(response){
				let token = response.token;

				if(token != ""){
					// Set Input to Default Style
					EmailInput.clear();
					EmailInput.setDefaultStroke();
					PasswordInput.clear();
					PasswordInput.setDefaultStroke();
				}
			})
			.catch(function(error) {
				console.log("Couldn't get register token: " + error);
			});
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
