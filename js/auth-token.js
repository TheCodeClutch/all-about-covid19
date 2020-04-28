function getToken(currToken) {
	var dataPromise = fetch('https://thecodeclutch.herokuapp.com/auth/getToken', {
		method: 'GET',
		headers: {
			Authorization: currToken
		}
	});
	dataPromise.then(data => {
		return data.json()
	})
	.then( val => {
		localStorage.setItem('TCC_SID', val.token)
	})
	.catch( err => {
		// Token refresh error
	})
}

window.setInterval(function(){
  getToken(localStorage.getItem('ABC19_SID'))
}, 720000);