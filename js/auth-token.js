function getToken(currToken) {
	console.log(currToken)
	var dataPromise = fetch('https://allaboutcovid-19.herokuapp.com/auth/getToken', {
		method: 'GET',
		headers: {
			Authorization: currToken
		}
	});
	dataPromise.then(data => {
		return data.json()
	})
	.then( val => {
		localStorage.setItem('ABC19_SID', val.token)
	})
	.catch( err => {
		// Token refresh error
	})
}

window.setInterval(function(){
  getToken(localStorage.getItem('ABC19_SID'))
}, 720000);