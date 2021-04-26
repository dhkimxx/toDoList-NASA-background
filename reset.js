const resetBtn = document.querySelector("js-reset");

function resetAll(){

}

function init(){
    resetBtn.addEventListener("click",resetAll);
    resetBtn.innerText = "Reset";
}
init();