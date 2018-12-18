let Context = require("Modules/Context");

let mail = Context.user.map(function(x) {  return x.mail; });
let password = Context.user.map(function(x) { return x.password; });

function goBack() {
	router.goBack();
}

function register() {
	Context.registerUser(mail.value, password.value);
}

module.exports = {
	mail: mail,
	password: password,

	goBack: goBack,
	register: register
};