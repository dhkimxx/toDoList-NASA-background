const imageSource = document.querySelector(".js-imageSource");

const API_KEY_NASA = "v3fq0XIiuubbmt5BanOOabGiEAANPfW27aYwFNPH";
 
const body = document.querySelector("body");
const IMG_NUMVER = 9;

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMVER);
    return number;
}

function paintWallpaper(){
    const image = new Image();
    fetch(`https://api.nasa.gov/planetary
/apod?api_key=${API_KEY_NASA}`).then(function(response){
    return response.json();
}).then(function(json){
    const img_check_youtube =  json.url.indexOf("youtube");
    const img_check_viemo =  json.url.indexOf("vimeo");
    if(img_check_viemo > 0 | img_check_youtube > 0){
        image.src = `./images/${genRandom() + 1}.jpg`;
    }
    else{
        image.src = json.url;
        imageSource.innerText = "image from NASA APIs"
    }
});
    image.classList.add("bgImage");
    body.appendChild(image);   
}

function init(){
    paintWallpaper();
}

init();
