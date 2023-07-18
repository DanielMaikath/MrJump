import { Player } from "./player.js"
import { Platform} from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225,750,board)
const platform = new Platform(150, 500, board, player)
const platform2 = new Platform(250,200,board,player)
let timerId 


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
window.addEventListener("keyup",function(e){
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.direction = 0 //Al levantar la tecla correspondiente, dejamos de movernos
      }
})

//Función que comienza el juego
function gameLoop(){
    player.move()
    if(platform.checkCollitions() || platform2.checkCollitions()){
        player.collition = true
    }
        
        
}



function start(){
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop,32)
}
start()




