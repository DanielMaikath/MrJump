import { Player } from "./player.js"
import { Platform } from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225, 450, board)
const platform = new Platform(150, 500, board, player)
const platform2 = new Platform(250, 200, board, player)
const startButton = document.getElementById("start")
const pantallaInicial = document.getElementById("pantalla-inicial")
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
    if(player.isDead){
       gameOver()
    }
    player.move()
    if (platformCollition()) { 
        player.collition = true
    }
    if (player.y <= 200 ) {
        platformScroll()
        shouldCreatePlatform = true
    } 
    if (player.y > 250) {
        if(shouldCreatePlatform ){
            createPlatform()
        }
        scrollStatus()
    }

}

function createPlatform() {
    let cordX = Math.floor(Math.random() * 400)
    let cordY = Math.floor(Math.random() * (300) )
    // let cordXTop = Math.floor(Math.random() * 400)
    // let cordYTop = Math.floor(Math.random() * (100)  )
    let platformLocal = new Platform(cordX, cordY, board, player)
    // let platformTop = new Platform(cordXTop, cordYTop, board, player)
    // platformTop.insertPlatform()
    platformLocal.insertPlatform()
    platforms.push(platformLocal)
    console.log(platforms)
    // platforms.push(platformTop)
    platformLocal.shouldScroll = false
    shouldCreatePlatform = false
}


//Funcion colisiones de las plataformas
function platformCollition() {
    let arr = []
    platforms.forEach(function (plataforma) {
        arr.push(plataforma.checkCollitions())
    })
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
//Evento que inicia el juego
startButton.addEventListener("click",function(e){
    pantallaInicial.removeChild(e.currentTarget)
    board.removeChild(pantallaInicial)
    start() 
})

//Funcion para borrar plataformas
function deletePlatfoms(){
    platforms.forEach(function(plataforma){
        console.log(plataforma)
        plataforma.sprite.parentNode.removeChild(plataforma.sprite)
    })
}


//Funcion Game Over
function gameOver(){
    deletePlatfoms()
    pantallaInicial.setAttribute("id","game-over")
    board.appendChild(pantallaInicial)
    clearInterval(timerId)
    board.removeChild(player.sprite)
}

//Función que comienza el juego
function start() {
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop, 16)
}
//start()




