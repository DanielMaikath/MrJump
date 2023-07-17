import { Player } from "./player.js"
import { Platform} from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225,750,board)
const platform = new Platform(150, 500, board)


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
    platform.insertPlatform()
    let timerId = setInterval(player.move,16)
}
start()

//Aleatoridad de los enemigos
function enemyIntervals(){
    var random = Math.floor(Math.random() * 10)
}
console.log(player)


