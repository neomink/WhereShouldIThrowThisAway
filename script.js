const $content = document.getElementById('plain')

const $step1 = document.getElementById('step-1')
const $step2 = document.getElementById('step-2')
const $goodJobButton = document.getElementById('good-job-button')
const $instruction = document.getElementById('instruction')

const $location1 = document.getElementById('step-2-cig-butt')
const $location2 = document.getElementById('step-2-banana-peel')
const $location3 = document.getElementById('step-2-paper-ball-2')
const $location4 = document.getElementById('step-2-apple-2')
const $location5 = document.getElementById('step-2-can-2')

// for popup
const $popup = document.getElementById('popup')
const $closePopup = document.getElementById('close')
const $popupContent = document.getElementById('popup-content')
const $popupMap = document.getElementById('popup-map')

// for list
const $showList = document.getElementById('list-icon')
const $list = document.getElementById('step-2-list')
const $listContent = document.getElementById('list-content')

// back to original layout
const $showOriginal = document.getElementById('original-icon')


let $dataSet = []

// App Helper Functions
function calculateDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km, 0.621371 miles per km
  }

// fetch data
fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        $dataSet = data
    });
    
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
    $instruction.style.display = 'none'
    $goodJobButton.style.display = 'block'
}

function dragEnter(ev) {
  ev.preventDefault();
}

// click good job button to go to step 2

$goodJobButton.addEventListener('click', function (){
    goToStep2()
})

// step 2: search page, use current location to load locations of 5 trash cans in order of proximity

function goToStep2(){
    $step1.style.display = 'none' // hide step 1 
    $step2.style.display = 'flex' // show step 2
    $list.style.display = 'none'

    // get user's location
    navigator.geolocation.getCurrentPosition(function(position) {
        userCoordinates = position.coords 
        console.log(userCoordinates)

        // sort data set based on user's location closest > furthest array function: sort
        console.log('sorting.... please wait')
        $dataSet.sort((a, b) => {
            const distanceA = calculateDistance(userCoordinates.latitude, userCoordinates.longitude, a.Latitude, a.Longitude);
            const distanceB = calculateDistance(userCoordinates.latitude, userCoordinates.longitude, b.Latitude, b.Longitude);
             
            if (distanceA < distanceB) {
              return -1;
            }
            if (distanceA > distanceB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

          console.log($dataSet)

          // first location
          const first = JSON.stringify($dataSet.slice(0,1));
          const firstObj = JSON.parse(first);
          const firstLocationDescription = firstObj[0].LOCATION_DESCRIPTION
          const firstLatitide = firstObj[0].Latitude
          const firstLongitude = firstObj[0].Longitude

          $location1.addEventListener('click', function (){
          showFirstPopup()
          })
          function showFirstPopup() {
            $popupContent.innerHTML = `
            ${firstLocationDescription}
            <iframe
              id="embed-content"
              frameborder="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=${firstLatitide},${firstLongitude}&output=embed">
            </iframe>
            <a href="https://www.google.com/maps/dir/${userCoordinates.latitude},${userCoordinates.longitude}/${firstLatitide},${firstLongitude}" target="_blank" id="link-to-direction">
            Direction >>
            </a>
            `
            $popup.style.display = 'block'
          }

          // second location
          const second = JSON.stringify($dataSet.slice(1,2));
          const secondObj = JSON.parse(second);
          const secondLocationDescription = secondObj[0].LOCATION_DESCRIPTION
          const secondLatitide = secondObj[0].Latitude
          const secondLongitude = secondObj[0].Longitude

          $location2.addEventListener('click', function (){
          showSecondPopup()
          })
          function showSecondPopup() {
            $popupContent.innerHTML = `
            ${secondLocationDescription}
            <iframe
              id="embed-content"
              frameborder="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=${secondLatitide},${secondLongitude}&output=embed">
            </iframe>
            <a href="https://www.google.com/maps/dir/${userCoordinates.latitude},${userCoordinates.longitude}/${secondLatitide},${secondLongitude}" target="_blank" id="link-to-direction">
            Direction >>
            </a>
            `
            $popup.style.display = 'block'
          }

          // third location
          const third = JSON.stringify($dataSet.slice(2,3));
          const thirdObj = JSON.parse(third);
          const thirdLocationDescription = thirdObj[0].LOCATION_DESCRIPTION
          const thirdLatitide = thirdObj[0].Latitude
          const thirdLongitude = thirdObj[0].Longitude

          $location3.addEventListener('click', function (){
          showThirdPopup()
          })
          function showThirdPopup() {
            $popupContent.innerHTML = `
            ${thirdLocationDescription}
            <iframe
              id="embed-content"
              frameborder="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=${thirdLatitide},${thirdLongitude}&output=embed">
            </iframe>
            <a href="https://www.google.com/maps/dir/${userCoordinates.latitude},${userCoordinates.longitude}/${thirdLatitide},${thirdLongitude}" target="_blank" id="link-to-direction">
            Direction >>
            </a>
            `
            $popup.style.display = 'block'
          }

          // fourth location
          const fourth = JSON.stringify($dataSet.slice(3,4));
          const fourthObj = JSON.parse(fourth);
          const fourthLocationDescription = fourthObj[0].LOCATION_DESCRIPTION
          const fourthLatitide = fourthObj[0].Latitude
          const fourthLongitude = fourthObj[0].Longitude

          $location4.addEventListener('click', function (){
          showFourthPopup()
          })
          function showFourthPopup() {
            $popupContent.innerHTML = `
            ${fourthLocationDescription}
            <iframe
              id="embed-content"
              frameborder="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=${fourthLatitide},${fourthLongitude}&output=embed">
            </iframe>
            <a href="https://www.google.com/maps/dir/${userCoordinates.latitude},${userCoordinates.longitude}/${fourthLatitide},${fourthLongitude}" target="_blank" id="link-to-direction">
            Direction >>
            </a>
            `
            $popup.style.display = 'block'
          }

          // fifth location
          const fifth = JSON.stringify($dataSet.slice(4,5));
          const fifthObj = JSON.parse(fifth);
          const fifthLocationDescription = fifthObj[0].LOCATION_DESCRIPTION
          const fifthLatitide = fifthObj[0].Latitude
          const fifthLongitude = fifthObj[0].Longitude

          $location5.addEventListener('click', function (){
          showFifthPopup()
          })
          function showFifthPopup() {
            $popupContent.innerHTML = `
            ${fifthLocationDescription}
            <iframe
              id="embed-content"
              frameborder="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=${fifthLatitide},${fifthLongitude}&output=embed">
            </iframe>
            <a href="https://www.google.com/maps/dir/${userCoordinates.latitude},${userCoordinates.longitude}/${fifthLatitide},${fifthLongitude}" target="_blank" id="link-to-direction">
            Direction >>
            </a>
            `
            $popup.style.display = 'block'
          }

          // to close popup
          $closePopup.addEventListener('click', function (){
            closePopup()
          })
          function closePopup() {
            $popup.style.display = 'none'
          }
    })
}

// step 2 List: shows 5 addresses in list

$showList.addEventListener('click', function (){
  showList()
})

function showList() {

  const first = JSON.stringify($dataSet.slice(0,1));
  const firstObj = JSON.parse(first);
  const firstLocationDescription = firstObj[0].LOCATION_DESCRIPTION

  const second = JSON.stringify($dataSet.slice(1,2));
  const secondObj = JSON.parse(second);
  const secondLocationDescription = secondObj[0].LOCATION_DESCRIPTION

  const third = JSON.stringify($dataSet.slice(2,3));
  const thirdObj = JSON.parse(third);
  const thirdLocationDescription = thirdObj[0].LOCATION_DESCRIPTION

  const fourth = JSON.stringify($dataSet.slice(3,4));
  const fourthObj = JSON.parse(fourth);
  const fourthLocationDescription = fourthObj[0].LOCATION_DESCRIPTION

  const fifth = JSON.stringify($dataSet.slice(4,5));
  const fifthObj = JSON.parse(fifth);
  const fifthLocationDescription = fifthObj[0].LOCATION_DESCRIPTION

  $listContent.innerHTML = `
  <div id="adress-container">
  <p class="address" id="first-address">
    ${firstLocationDescription}
  </p>
  <p class="address" id="second-address">
    ${secondLocationDescription}
  </p>
  <p class="address" id="third-address">
    ${thirdLocationDescription}
  </p>
  <p class="address" id="fourth-address">
    ${fourthLocationDescription}
  </p>
  <p class="address" id="fifth-address">
    ${fifthLocationDescription}
   </p>
</div>
  `

  $step2.style.display = 'none'
  $list.style.display = 'block'
}

$showOriginal.addEventListener('click', function (){
  goToStep2()
})
