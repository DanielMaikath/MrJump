import { Player } from "./player.js"
import { Platform} from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225,750,board)
const platform = new Platform(150, 500, board, player)


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
function gameLoop(){
   
    if(platform.checkCollitions()){
        player.collition = true
    }
        player.move()
        
}



function start(){
    player.insertPlayer()
    platform.insertPlatform()
    let timerId = setInterval(gameLoop,16)
}
start()

console.log(player)


