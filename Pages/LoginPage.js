let Context = require("Modules/Context");

let email = Context.user.map(function(x) { return x.email; }).inner();
let password = Context.user.map(function(x) { return x.password; }).inner();


function login() {
	console.log('login');
}

function goToRegister() {
	router.push("register");
}

module.exports = {
	email: email,
	password: password,

	login: login,
	goToRegister: goToRegister
};
