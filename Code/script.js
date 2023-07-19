import { Player } from "./player.js"
import { Platform} from "./platform.js"
const board = document.getElementById("board")
const player = new Player(450,750,board)
const platform = new Platform(150, 500, board, player)
const platform2 = new Platform(250,200,board,player)
let platforms = [platform,platform2]
let timerId //Variable global que almacena el id del intervalo

//Función que recoge el evento para mover al jugador horizontalmente, mediante las flechas izquierda y derecha
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
//Función que recoge el evento para detener al jugador de moverse horizontalmente
window.addEventListener("keyup",function(e){
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.direction = 0 //Al levantar la tecla correspondiente, dejamos de movernos
      }
})

//Función que se repite indefinidamente, con 
function gameLoop(){
    player.move()
    if(player.y <= 200){
        platform.scroll() //Cambiar esto
        platform2.scroll()
    }
    if(player.y > 350){
        if(platform.shouldScroll == false){
            createPlatform()
        }
        platform.shouldScroll = true // Cambiar esto
        platform2.shouldScroll = true
    }
    if(platform.checkCollitions() || platform2.checkCollitions() ){ // Cambiar esot
        player.collition = true
    }
        
        
}

function createPlatform (){
    let cordX = Math.floor(Math.random() * 400)
    let cordY = Math.floor(Math.random() * 350)
    console.log("X :" + cordX)
    console.log("Y :" + cordY)
    let platformLocal = new Platform(cordX,cordY,board,player)
    platformLocal.insertPlatform()
    platforms.push(platformLocal)
}


//Funcion colisiones de las plataformas
//Funcion que haga scroll de todas las plataformas
//Funcion que cambie los ShouldScroll a true



//Función que comienza el juego
function start(){
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop,32)
    
}
start()




