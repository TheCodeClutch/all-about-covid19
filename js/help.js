document.getElementById("preloader").style.display = "block";
async function loginCheck() {
	if (localStorage.getItem('ABC19_SID') !== null) {
		let resp = await fetch("https://allaboutcovid-19.herokuapp.com/auth/isloggedin", {
			method: 'GET',
			headers: {
				Authorization: localStorage.getItem('ABC19_SID')
			}
		})
		let res = await resp.json()
		if (res.status === 401) {
			document.getElementById("login").style.display = "block";
			localStorage.setItem('ABC19_login', false);
		}
		else {
			localStorage.setItem('ABC19_login', true);
			document.getElementById('user-name').innerHTML = res.name;
			document.getElementById('user-pic').innerHTML = `<img src="${res.profile_pic}" style="height : 40px; width : 40px; border-radius : 50%; margin-right : 15px">`
		}

	} else {
		document.getElementById("login").style.display = "block";
		localStorage.setItem('ABC19_login', false);
	}
}
async function updateLoginWithUrl(url) {
	let name = await url.searchParams.get("name");
	let email = await url.searchParams.get("email");
	let sessionID = await url.searchParams.get("sessionID");
	let image = await url.searchParams.get("image");
	localStorage.setItem('ABC19_SID', sessionID);
	localStorage.setItem('ABC19_login', true);
	document.getElementById('user-name').innerHTML = name;
	document.getElementById('user-pic').innerHTML = `<img src="${image}" style="height : 40px; width : 40px; border-radius : 50%; margin-right : 15px">`
}

function updateStorageVar() {
	if (localStorage.getItem('ABC19_SID') !== null) {
		localStorage.setItem('ABC19_login', true);
	} else {
		localStorage.setItem('ABC19_login', false);
	}
}

function fieldReset(e) {
	e.target.style.borderColor = 'lightgray'
	document.getElementById('submit-btn').innerHTML = "Send Request";
}

function getFormattedTime() {
	let date = new Date();
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + ", " + date.getHours() + ":" + ("00" + date.getMinutes()).slice(-2)
	return dateString;
}

function validate() {
	let isValid = true;
	if (document.getElementById('stateId').value.length === 0) {
		document.getElementById('stateId').style.borderColor = '#FF073A'
		isValid = false;
	}
	if (document.getElementById('cityId').value.length === 0) {
		document.getElementById('cityId').style.borderColor = '#FF073A'
		isValid = false;
	}
	if (document.getElementById('title').value.length === 0) {
		document.getElementById('title').style.borderColor = '#FF073A'
		isValid = false;
	}
	if (document.getElementById('message').value.length <= 100) {
		document.getElementById('message').style.borderColor = '#FF073A'
		isValid = false;
	}
	if (isValid) {
		return true;
	}
	return false;
}

let url_string = window.location.href;
let url = new URL(url_string);
if (url.searchParams.get("name") !== null) {
	updateLoginWithUrl(url);
} else {
	loginCheck();
}
window.onload = function () {
	document.getElementById("preloader").style.display = "none";
	var quotes = ["#StaySafe", "#StayAtHome", "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands","#StaySafe", "#StayAtHome",
        "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands", "#StaySafe", "#StayAtHome",
        "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands", "#StaySafe", "#StayAtHome",
        "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands", "#StaySafe", "#StayAtHome", "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands", "#StaySafe", "#StayAtHome",
        "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors", "#MyGovFactCheck", "#InThisTogether", "#Let'sDoOurPart", "#JoinHands"];

	for (let i = 0; i < quotes.length; i++) {
		setTimeout(function () {
			document.getElementById("hashtag").innerHTML = quotes[i];
		}, i * 4000);
	}
	updateStorageVar();
	document.getElementById('submit-btn').addEventListener('click', () => {
		if (localStorage.getItem('ABC19_login') === 'true') {
			if (validate()) {
				document.getElementById('submit-btn').innerHTML = "Sending...";
				let data = {
					time_ms: Date.now(),
					time_formatted: getFormattedTime(),
					state: document.getElementById('stateId').value,
					city: document.getElementById('cityId').value,
					title: document.getElementById('title').value,
					description: document.getElementById('message').value,
				}
				fetch('https://allaboutcovid-19.herokuapp.com/posts/saveposts', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						'Authorization': localStorage.getItem('ABC19_SID')
					},
					body: JSON.stringify(data)
				})
					.then(res => res.json())
					.then(data => {
						if (data.msg !== undefined) {
							Swal.fire({
								icon: 'success',
								title: 'Yayayay',
								text: data.msg
							})
							document.getElementById('submit-btn').innerHTML = "Send Request";
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: data.err,
								footer: '<a href="./userrequest.html">Show my requests</a>'
							})
							document.getElementById('submit-btn').innerHTML = "Send Request";
						}

					})
			}
		}
		else {
			Swal.fire({
				title: 'Login',
				text: "You need to be logged in before posting",
				icon: 'info',
				showClass: {
					popup: 'animated fadeInDown faster'
				},
				hideClass: {
					popup: 'animated fadeOutUp faster'
				},
				showCancelButton: false,
				confirmButtonColor: '#FFFFFF',
				cancelButtonColor: '#FF073A',
				confirmButtonText: 'Login with Google'
			}).then((result) => {
				if (result.value) {
					window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=494631050345-uov5hrao1lv23e78bpmbn6t5argm5qug.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fallaboutcovid-19.herokuapp.com%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile';
				}
			})
			document.getElementsByClassName('swal2-confirm swal2-styled')[0].innerHTML = `<img width="20px" style="margin-bottom: 2px; margin-right: 2px;" src="./assets/google.png"
														alt="Google sign-in">
												Login with Google`
			document.getElementsByClassName('swal2-confirm swal2-styled')[0].style.color = '#000000'
		}
	})
}

