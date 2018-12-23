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
	console.log('register');

	if( error.value === false) {
		console.log('kein fehler');
		console.log(error.value);
		//Context.registerUser(email.value, password.value);
	}else{
		console.log('fehler');
		console.log(error.value);
		//error.value = true;
      	Context.status.value = {
      		message: 'Empty Email Adress',
      		error: true
      	};
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
