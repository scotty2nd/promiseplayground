function goBack() {
	router.goBack();
}

function sendRequest() {
	const newPost = {
    	email: "sydney@fife",
    	password: "123"
	}

	const options = {
	    method: 'POST',
	    body: JSON.stringify(newPost),
	    headers: new Headers({
	        'Content-Type': 'application/json'
	    })
	}

	fetch('https://reqres.in/api/register', options)
    	.then(function(response){
    		return response.json();
    	})
		.then(function(data){
			console.dir(data);
    		return data;
    	})
}

module.exports = {
	goBack: goBack,
	sendRequest: sendRequest
};