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
			document.getElementById('login-status').innerHTML = '<a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=494631050345-uov5hrao1lv23e78bpmbn6t5argm5qug.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fallaboutcovid-19.herokuapp.com%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile">Login with Google</a> to view your posts'
			document.getElementById('login-status').style.display = "block";
		}
		else {
			localStorage.setItem('ABC19_login', true);
			document.getElementById('user-name').innerHTML = res.name;
			document.getElementById('user-pic').innerHTML = `<img src="${res.profile_pic}" style="height : 40px; width : 40px; border-radius : 50%; margin-right : 15px">`
		}

	} else {
		document.getElementById("login").style.display = "block";
		localStorage.setItem('ABC19_login', false);
		document.getElementById('login-status').innerHTML = '<a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=494631050345-uov5hrao1lv23e78bpmbn6t5argm5qug.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fallaboutcovid-19.herokuapp.com%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile">Login with Google</a> to view your posts'
		document.getElementById('login-status').style.display = "block";
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
		document.getElementById('login-status').innerHTML = '<a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=494631050345-uov5hrao1lv23e78bpmbn6t5argm5qug.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fallaboutcovid-19.herokuapp.com%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile">Login with Google</a> to view your posts'
		document.getElementById('login-status').style.display = "block";
	}
}

function fieldReset(e) {
	e.target.style.borderColor = 'lightgray'
	document.getElementById('submit-btn').innerHTML = "View all requests";
}

function getFormattedTime() {
	let date = new Date();
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + ", " + date.getHours() + ":" + ("00" + date.getMinutes()).slice(-2)
	return dateString;
}

function deletePost(event) {

	fetch('https://allaboutcovid-19.herokuapp.com/posts/removepost', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': localStorage.getItem('ABC19_SID')
		},
		body: JSON.stringify({
			post_id: event.target.getAttribute('data-abc19-post-id')
		})
	})
		.then(res => { return res.json() })
		.then(data => {
			if (data.msg !== undefined) {
				Swal.fire({
					text: data.msg,
					icon: 'info',
					showClass: {
						popup: 'animated fadeInDown faster'
					},
					hideClass: {
						popup: 'animated fadeOutUp faster'
					},
					showCancelButton: false,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#FF073A',
					confirmButtonText: 'Ok'
				})
				.then(res => {
					window.location.href = "https://coviddesk.in/userrequest.html"
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: data.err
				})
				.then(res => {
					window.location.href = "https://coviddesk.in/userrequest.html"
				})
			}
		})
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
		console.log(quotes[i]);
		setTimeout(function () {
			document.getElementById("hashtag").innerHTML = quotes[i];
		}, i * 4000);
	}
	updateStorageVar();
	if (localStorage.getItem('ABC19_login') === 'true') {
		document.getElementById('login-status').innerHTML = 'Loading your posts...'
		document.getElementById('login-status').style.display = "block";
		fetch('https://allaboutcovid-19.herokuapp.com/posts/getselfposts', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': localStorage.getItem('ABC19_SID')
			}
		})
			.then(res => res.json())
			.then(resp => {
				if (resp.msg !== undefined) {
					let data = resp.msg;
					let content = "";
					if (data.length === 0) {
						document.getElementById('login-status').innerHTML = 'No posts to show, post one <a href="https://coviddesk.in/help.html">here</a>'
						document.getElementById('login-status').style.display = "block";
						return;
					}
					document.getElementById('login-status').style.display = "none";
					for (let i = data.length - 1; i >= 0; i = i - 1) {
						content = content + `<div data-aos="zoom-out"  style="margin-top : 20px; margin-bottom : 20px">
													<div class="card" style="width: 100%">
														<div class="card-body">
															<div style="display: inline-block;">
																<img src='${data[i].IMAGE_URL}' style="height: 60px; width : 60px; border-radius: 50%; margin-right : 20px;">
															</div>
															<div style="display: inline-block;transform: translateY(25%);">
																<h5 class="card-title">${data[i].TITLE}</h5>
																<h6 class="card-subtitle mb-2 text-muted">by ${data[i].NAME}</h6>
															</div>
															<div class="time" style="float: right; transform: translateY(50%);">
													<span>${data[i].TIME_FORMATTED}</span>
															</div>       
															<div style="margin-top : 20px">
															<p class="card-text" style="text-align: justify">${data[i].DESCRIPTION}</p>
														</div>
														<div class="col-12" style="margin-top : 20px">
															<input id='comm-attr-${data[i].POST_ID}' type="text" style="width: 100%; margin-right : 20px; padding : 3px; margin-top : 10px" >
														</div>
														<div class="col-12" >
															<div style="float : right">
															<button class="btn btn-primary" data-abc19-post-id='${data[i].POST_ID}' onclick="postComment(event)" data-comment-attr='comm-attr-${data[i].POST_ID}'  style="padding : 3px 20px 3px 20px; min-width : 40%; transform : translateY(-5%); margin-top : 10px">Post</button>
																</div>
																<div style="float: left; padding-top : 13px">
																	<a class="card-link" onclick="changeText(event)" data-toggle="collapse" href='#${data[i].POST_ID}' role="button" aria-expanded="false" aria-controls="collapseExample">Show comments</a>
																</div>
															</div>
                                                        </div>
                                                        <div class="col-12">
                                                            <button class="btn btn-danger" onclick="deletePost(event)" data-abc19-post-id='${data[i].POST_ID}'  style="padding : 3px 50px 3px 50px; width : 100%; margin-top : 15px; margin-bottom : 15px">Delete Post</button>
                                                        </div>
													</div>
													<div class="collapse" id='${data[i].POST_ID}'>`

						for (let j = 0; j < data[i].COMMENTS.length; j = j + 1) {

							content = content + `														
													<div class="card" style="padding-left : 40px">
															<div class="card-metadata card-body">
																<div class="name-email" style="float: left;">
																	<img src='${data[i].COMMENTS[j].PIC_URL}' style="height: 40px; width : 40px; border-radius: 50%; margin-right : 20px"><span class="name">${data[i].COMMENTS[j].NAME}</span>
																</div>
																<div class="date time" style="float: right; transform: translateY(25%);">
																	${data[i].COMMENTS[j].TIME_FORMATTED}
																</div>
															</div>
															<div class="card-body" style="padding-top : 0; text-align: justify;">
																${data[i].COMMENTS[j].COMMENT_DESC}
															</div>
														</div>`
						}
						content = content + `</div></div>`

					}
					document.getElementById('posts-container').innerHTML = content;
				}

			})
			.catch(error => {
				document.getElementById('login-status').innerHTML = error.err
				document.getElementById('login-status').style.display = "block";
			})

	}
	else {
		document.getElementById('user-name').innerHTML = name;
		document.getElementById('user-pic').innerHTML = `<img src="${image}" style="height : 40px; width : 40px; border-radius : 50%; margin-right : 15px">`
	}
}

function changeText(event) {
	if (event.target.innerHTML === "Show comments") {
		event.target.innerHTML = "Hide comments"
	} else if (event.target.innerHTML === "Hide comments") {
		event.target.innerHTML = "Show comments"
	}
}

function postComment(event) {
	let idVal = event.target.getAttribute('data-comment-attr');
	if (document.getElementById(String(idVal)).value.length < 1) {
		document.getElementById(String(idVal)).style.borderColor = '#FF073A'
		return;
	}
	if (localStorage.getItem('ABC19_login') === 'true') {
		event.target.innerHTML = "Posting..."
		let data = {
			time_ms: Date.now(),
			time_formatted: getFormattedTime(),
			description: document.getElementById(String(idVal)).value,
			post_id: event.target.getAttribute('data-abc19-post-id')
		}
		fetch('https://allaboutcovid-19.herokuapp.com/posts/savecomment', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': localStorage.getItem('ABC19_SID')
			},
			body: JSON.stringify(data)
		})
			.then(res => { return res.json() })
			.then(message => {
				event.target.innerHTML = "Post"
				if (message.msg !== undefined) {
					Swal.fire({
						icon: 'success',
						title: 'Yayayay',
						text: message.msg
					})
					.then(res => {
						window.location.href = "https://coviddesk.in/userrequest.html"
					})
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: message.err
					})
				}
			})
	} else {
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
}

