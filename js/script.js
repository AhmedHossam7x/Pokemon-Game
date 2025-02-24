const GRASS_COUNT = 50;
const BALL_COUNT = 5;
const START_PLAYER_POS = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
const SOUND = new Audio("../assets/coin.mp3");

let playerPos = {
    x: 0,
    y: 0
}
let playerVal = {
    x: 0,
    y: 0
}
let player = document.querySelector(".player");
let PLAYER_SPEED = 1.8;

window.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "ArrowUp":
            playerVal.y = -1 * PLAYER_SPEED;
            player.style.backgroundImage = "url('assets/player_front.png')";
            break;
        case "ArrowDown":
            playerVal.y = 1 * PLAYER_SPEED;
            player.style.backgroundImage = "url('assets/player_back.png')";
            break;
        case "ArrowLeft":
            playerVal.x = -1 * PLAYER_SPEED;
            player.style.backgroundImage = "url('assets/player_left.png')";
            break;
        case "ArrowRight":
            playerVal.x = 1 * PLAYER_SPEED;
            player.style.backgroundImage = "url('assets/player_right.png')";
            break;
    }
    player.classList.add("walk");
});
window.addEventListener("keyup", e =>{
    playerVal.x = 0;
    playerVal.y = 0;
    player.classList.remove("walk");
});

function start(){
    generateItemElements(GRASS_COUNT, "grass");
    generateItemElements(BALL_COUNT, "ball");
    playerPos = START_PLAYER_POS;
}
function update(){
    playerPos.x +=playerVal.x; 
    playerPos.y +=playerVal.y;
    
    player.style.left = playerPos.x + "px";
    player.style.top = playerPos.y + "px";
    
    checkCollistions();
    requestAnimationFrame(update);
}
function generateItemElements(items, classes){
    for(let count = 0; count < items; count++){
        let newElement = document.createElement("div");
        newElement.classList.add(classes);
        newElement.style.left = Math.random() * 100  + "%";
        newElement.style.top = Math.random() * 100  + "%";
        document.body.appendChild(newElement);
    }
}
function checkCollistions(){
    balls = document.querySelectorAll(".ball");
    balls.forEach(ball => {
        if(collision(ball, player)){
            ball.style.left = Math.random() * 100 + "%";
            ball.style.top = Math.random() * 100 + "%";
            SOUND.play();
        }
    })
}
function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

start();
update();