document.getElementById("preloader").style.display = "block";

fetch('https://api.covid19india.org/data.json')
.then(res => {
	console.log(res)
	return res.json();
})
.then(data => {
	document.getElementById('count-confirmed').innerHTML = 	data.statewise[0].confirmed
	document.getElementById('count-recovered').innerHTML = data.statewise[0].recovered
	document.getElementById('count-deceased').innerHTML = data.statewise[0].deaths
	document.getElementById('count-active').innerHTML =	data.statewise[0].active
	document.getElementById('inc-confirmed').innerHTML = data.statewise[0].deltaconfirmed
	document.getElementById('inc-recovered').innerHTML = data.statewise[0].deltarecovered
	document.getElementById('inc-deceased').innerHTML = data.statewise[0].deltadeaths

})

window.onload = () => {
		document.getElementById("preloader").style.display = "none";
		window.addEventListener('resize', () => {
			if(window.outerWidth < 990){
				document.getElementById('c').innerHTML = 'Conf';
				document.getElementById('a').innerHTML = 'Act';
				document.getElementById('r').innerHTML = 'Rec';
				document.getElementById('d').innerHTML = 'Dead';
			} else {
				document.getElementById('c').innerHTML = 'Confirmed';
				document.getElementById('a').innerHTML = 'Active';
				document.getElementById('r').innerHTML = 'Recovered';
				document.getElementById('d').innerHTML = 'Deceased';
			}
		})
}