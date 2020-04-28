document.getElementById("preloader").style.display = "block";

window.onload = () => {
    document.getElementById("preloader").style.display = "none";

    var quotes = ["#StaySafe", "#StayAtHome", "#SocialDistancing", "#IndiaFightsCorona", "#SafeHands", "#TogetherAtHome", "#QuarantineAndChill",
        "#FlattenTheCurve", "#Lockdown", "#WorkingFromHome", "#ViewFromMyWindow", "#MyPandemicSurvivalPlan", "#IndiaFightsBack", "#WithMe",
        "#EverydayIsASunday", "#CoronaWarriors"];

    for (let i = 0; i < quotes.length; i++) {
        console.log(quotes[i]);
        setTimeout(function () {
            document.getElementById("hashtag").innerHTML = quotes[i];
        }, i * 2000);
    }
}
