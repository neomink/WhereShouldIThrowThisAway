const $step1 = document.getElementById('step-1')
const $step2 = document.getElementById('step-2')
const $goodJobButton = document.getElementById('good-job-button')

const $location1 = document.getElementById('step-2-cig-butt')
const $location2 = document.getElementById('step-2-banana-peel')
const $location3 = document.getElementById('step-2-paper-ball-2')
const $location4 = document.getElementById('step-2-apple-2')
const $location5 = document.getElementById('step-2-can-2')

// for popup
const $popup = document.getElementById('popup')
const $closePopup = document.getElementById('close')
const $popupContent = document.getElementById('popup-content')



// step 1: home page, drag and drop trashes into the litter basket

function dragEnter(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text"); // img태그 아이디를 가져옴
    ev.target.appendChild(document.getElementById(data)); // 다른 div태그에 img를 추가함(옮김. 드래그처리)
}

$goodJobButton.addEventListener('click', function (){
    goToStep2()
})

// step 2: search page, use current location to load locations of 5 trash cans in order of proximity

function goToStep2(){
    $step1.style.display = 'none' // hide step 1 
    $step2.style.display = 'flex' // show step 2

    navigator.geolocation.getCurrentPosition(function(position) {
        userCoordinates = position.coords 
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        console.log(latitude, longitude)
    })
}

// step 2: click on list icon to show the results in list


// step 2-2: popup shows the location and street view and link to google map direction
// location 1
$closePopup.addEventListener('click', function (){
    closePopup()
})

$location1.addEventListener('click', function (){
    showPopup()
})

function showPopup() {
    $popupContent.innerHTML = `
    <p> address </p>
    `

    $popup.style.display = 'block'
}

function closePopup() {
    $popup.style.display = 'none'
}


const APP_TOKEN = 'BjZvwlIGuui0IWyouPT79Ezq6' // <- Replace this with your app token
const RESOURCE_ID = '8znf-7b2c' // <- Replace this with the ID for the data resource that you want to look up
const LIMIT = 5 // <- Replace this with the number of records you want to pull

// Construct the URL that we need to make requests
const url = `https://data.cityofnewyork.us/resource/${RESOURCE_ID}.json?$limit=${LIMIT}&$$app_token=${APP_TOKEN}`

console.log(`Fetching url - ${url}`)

function showAddress() {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    });
}
