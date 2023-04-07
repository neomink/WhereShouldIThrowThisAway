console.log(navigator)

// using location of user
navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coord.latitude;
    let longtitude = position.coord.longtitude;
}, (err) => {

});