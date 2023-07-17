import { Player } from "./player.js"
const board = document.getElementById("board")
const player = new Player(225,750,board)



window.addEventListener("keydown",function(e){
    switch(e.key){
        case "ArrowLeft": 
            player.direction = -1
            break;
        case "ArrowRight":
            player.direction = 1
            break;
    }


})





//Función que comienza el juego
function start(){
    player.insertPlayer()
    let timerId = setInterval(player.move,16)
}
start()

console.log(player)


