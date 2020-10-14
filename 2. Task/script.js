function generateModalWindow(){

    var background = document.createElement("div");
    background.id = "background";
    background.className = "background";
    background.addEventListener("click",closeModalWindow,false);

    var window = document.createElement("div");
    window.className = "window";
    window.innerHTML = "<h2 class='model-window-title'>Model window</h2>"

    var closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "Close";

    window.appendChild(closeButton);
    background.appendChild(window);
    var body = document.getElementById("body");

    
    body.appendChild(background);
    setTimeout(function(){
        background.classList.add("smoothlyOpen")
    },10)

    body.classList.add("stop-scrolling");

}

function closeModalWindow(element){
    if(element.path[0].className == "background smoothlyOpen" || element.path[0].className == "close-button"){
        document.getElementById("background").classList.add("smoothlyClose");
        setTimeout(function(){
            document.getElementById("background").remove();
            body.classList.remove("stop-scrolling");
        },1000)
    }
}

