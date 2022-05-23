import weather from "./weather.js";
import content from "./content.js";

export function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

export function showPositionMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    weather(latitude + ',' + longitude)
        .then( weatherData => {
            // console.log(weatherData);
            const current = document.querySelector('#current');
            current.innerHTML = content(weatherData);
        })
        .catch ( err => {
            console.log('Promise com erro',err.message);
        })
}