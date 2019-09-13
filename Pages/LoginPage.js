let Context = require("Modules/Context");

let email = Context.user.map(function(x) { return x.email; }).inner();
let password = Context.user.map(function(x) { return x.password; }).inner();
let token = Context.status.map(function(x) { return x.token; }).inner();

function login() {
	// Email Feld Validierung in Komponent aufrufen
	if(EmailInput.validate() && password.value != ""){
		console.log('login');
		console.log(email.value);
		console.log(password.value);

		// User Daten an registerUser Funktion übergeben
		Context.loginUser(email.value, password.value)
			.then(function(response){
				let token = response.token;

				if(typeof token !== "undefined"){
					console.log('Login User. Token: ' + token);

					saveTokenToFile(token);

					// Weiterleiten auf Home Seite
					router.push("home");

					// Inputs auf Default Style setzen
					EmailInput.clear();
					EmailInput.setDefaultStroke();
					PasswordInput.clear();
					PasswordInput.setDefaultStroke();

					email.value = "";
					password.value = "";
				}else {
					console.log('Login Failed. Token: ' + token);
				}

				//Loading icon ausblenden
				LoadingPanel.stopLoading();
			})
			.catch(function(error) {
				//Loading icon ausblenden
				LoadingPanel.startLoading();
				console.log("Couldn't get register token: " + error);
			});
	}else {
		console.log('Login clicked but Error');
	}
}

function saveTokenToFile(token) {
	console.log('saveToken ' + token);
	let FileSystem = require("FuseJS/FileSystem");
	let path = FileSystem.dataDirectory + "/" + "token.tmp";

	FileSystem.writeTextToFile(path, token);
}

function goToRegister() {
	router.push("register");
}

function goToLoading() {
	router.push("loading");
}

module.exports = {
	email: email,
	password: password,
	token: token,

	login: login,
	goToRegister: goToRegister,
	goToLoading: goToLoading
};
