let Context = require("Modules/Context");

let email = Context.user.map(function(x) { return x.email; }).inner();
let password = Context.user.map(function(x) { return x.password; }).inner();
let token = Context.status.map(function(x) { return x.token; }).inner();


function login() {
	console.log('login');
}

function goToRegister() {
	router.push("register");
}

module.exports = {
	email: email,
	password: password,
	token: token,

	login: login,
	goToRegister: goToRegister
};
