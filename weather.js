const weather = document.querySelector(".js-weather");

const API_KEY = "75d737824194d22091e1067eab23d5b8";
const COORDS = 'coords';

function getweather(lat,lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?\
lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
.then(function(response){
    return response.json();
})
.then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${Math.ceil(temperature)}℃  ${place}`;
});
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getweather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){ 
        askForCoords();
    } 
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getweather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
 loadCoords();
}
init();