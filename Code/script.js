import { Player } from "./player.js"
import { Platform } from "./platform.js"
const board = document.getElementById("board")
const player = new Player(450, 750, board)
const platform = new Platform(150, 500, board, player)
const platform2 = new Platform(250, 200, board, player)
let platforms = [platform, platform2]
let timerId //Variable global que almacena el id del intervalo
var shouldCreatePlatform = true

//Función que recoge el evento para mover al jugador horizontalmente, mediante las flechas izquierda y derecha
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowLeft":
            player.direction = -1
            break;
        case "ArrowRight":
            player.direction = 1
            break;
    }
})
//Función que recoge el evento para detener al jugador de moverse horizontalmente
window.addEventListener("keyup", function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.direction = 0 //Al levantar la tecla correspondiente, dejamos de movernos
    }
})

//Función que se repite indefinidamente, con 
function gameLoop() {
    player.move()
    console.log(platforms)
    if (player.y <= 200) {
        platformScroll()
        shouldCreatePlatform = true
    } 
    if (player.y > 350) {
        if(shouldCreatePlatform){
            createPlatform()
        }
        scrollStatus()
    }
    if (platformCollition()) { // Cambiar esot
        player.collition = true
    }


}

function createPlatform() {
    let cordX = Math.floor(Math.random() * 400)
    let cordY = Math.floor(Math.random() * 350)
    console.log("X :" + cordX)
    console.log("Y :" + cordY)
    let platformLocal = new Platform(cordX, cordY, board, player)
    platformLocal.insertPlatform()
    platforms.push(platformLocal)
    shouldCreatePlatform = false
}


//Funcion colisiones de las plataformas
function platformCollition() {
    let arr = []
    platforms.forEach(function (plataforma) {
        arr.push(plataforma.checkCollitions())
    })
    console.log(arr.includes(true))
    return arr.includes(true)




}




//Funcion que haga scroll de todas las plataformas
function platformScroll() {

    platforms.forEach(function (plataforma) {
        if (plataforma.scroll()) {
            platforms.shift()
        }

    })
}



//Funcion que cambie los ShouldScroll a true
function scrollStatus() {
    platforms.forEach(function (plataforma) {
        plataforma.shouldScroll = true
    })
}



//Función que comienza el juego
function start() {
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop, 32)
}
start()




