let Context = require("Modules/Context");

let mail = Context.user.map(function(x) { return x.mail; });
let password = Context.user.map(function(x) { return x.password; });
let message = Context.status.map(function(x) { return x.message; }).inner();
let token = Context.status.map(function(x) { return x.token; }).inner();
let error = Context.status.map(function(x) { return x.error; }).inner();

function goBack() {
	router.goBack();
}

function register() {
	Context.registerUser(mail.value, password.value);
}


module.exports = {
	mail: mail,
	password: password,
	token: token,
	message: message,
	error: error,

	goBack: goBack,
	register: register
};