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
    json.url = "https://www.youtube.com/watch?v=RoR7wEEvIuo";
    const img_check = json.url.indexOf("youtube");
    if(img_check){
        image.src = `./images/${genRandom() + 1}.jpg`;
    }
    else{
        image.src = json.url;
    }
});
    image.classList.add("bgImage");
    body.appendChild(image);   
}

function init(){
    paintWallpaper();
}

init();
