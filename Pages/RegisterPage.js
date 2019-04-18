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
	EmailInput2.validate();
	// Passwort Validierung in Komponent aufrufen
	PasswordInput2.validate();

	if( EmailInput2.validate() && PasswordInput2.validate() ){
		// User Daten an registerUser Funktion übergeben
		Context.registerUser(email.value, password.value);
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
