let Context = require("Modules/Context");

let email = Context.user.map(function(x) { return x.email; }).inner();
let password = Context.user.map(function(x) { return x.password; }).inner();
let message = Context.status.map(function(x) { return x.message; }).inner();
let token = Context.status.map(function(x) { return x.token; }).inner();
let error = Context.status.map(function(x) { return x.error; }).inner();

/*let areFieldsFilled = Context.Observable(function() {
	let isEnabled = false;

	if(email.value == null){
		email.value = "";
	}

	if(password.value == null){
		password.value = "";
	}

	if( email.value !== "" && password.value !== "" ){
		isEnabled = true;
	}else {
		isEnabled = false;
	}

	return isEnabled;
});*/


function goBack() {
	router.goBack();
}

function register() {
	console.log('register click');
	// Email Feld Validierung in Komponent aufrufen
	EmailInput2.validate();
	// Passwort Validierung in Komponent aufrufen
	PasswordInput2.validate();

	if( EmailInput2.validate() && PasswordInput2.validate() ){
		Context.registerUser(email.value, password.value);
	}
}

module.exports = {
	email: email,
	password: password,
	token: token,
	message: message,
	error: error,
	//areFieldsFilled: areFieldsFilled,

	goBack: goBack,
	register: register
};
