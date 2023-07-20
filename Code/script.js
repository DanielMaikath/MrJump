import { Player } from "./player.js"
import { Platform } from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225, 450, board)
const platform = new Platform(150, 550, board, player)
const platform2 = new Platform(250, 200, board, player)
const startButton = document.getElementById("start")
const pantalla = document.getElementById("pantalla-inicial")
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
   /* if(player.y <= 10){
        player.playerIsOnTop = true
    }  */
    if (player.y <= 400 ) {
        platformScroll()
        shouldCreatePlatform = true
    } 
    if (player.y > 400) {
        if(shouldCreatePlatform ){
            createPlatform()
        }
        scrollStatus()
    }
    if (player.y <= 0 && player.speedY > 0 && top) {
        scrollStatus()
        createPlatform()
        platformScroll()
        top = false
    }
    if (player.speedY < 0) {
        top = true
    }
}

function createPlatform() {
    let cordX = Math.floor(Math.random() * 400)
    let cordY = Math.floor(Math.random() * (0) )
    // let cordXTop = Math.floor(Math.random() * 400)
    // let cordYTop = Math.floor(Math.random() * (100)  )
    let platformLocal = new Platform(cordX, cordY, board, player)
    // let platformTop = new Platform(cordXTop, cordYTop, board, player)
    // platformTop.insertPlatform()
    platformLocal.insertPlatform()
    platforms.push(platformLocal)
    // platforms.push(platformTop)
    platformLocal.shouldScroll = true
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
    pantalla.removeChild(e.currentTarget)
    board.removeChild(pantalla)
    start() 
})

//Funcion para borrar plataformas
function deletePlatfoms(){
    platforms.forEach(function(plataforma){
        plataforma.sprite.parentNode.removeChild(plataforma.sprite)
    })
}


//Funcion Game Over
function gameOver(){
    console.log("game over")
    clearInterval(timerId)
    if(platforms.length > 0){
    deletePlatfoms()
    }
    board.removeChild(player.sprite)
    pantalla.setAttribute("id","game-over")
    board.appendChild(pantalla)
    startButton.setAttribute("id","reset-button")
    startButton.innerText = "Restart"
    pantalla.appendChild(startButton)
}

//Funcion Restart
function restart(){
    player.x = 225
    player.y = 450
    platform.x = 150
    platform.y = 550
    platform2.x = 250
    platform2.y = 200
    player.isDead = false
    platforms = [platform, platform2]
    shouldCreatePlatform = true
}
//Función que comienza el juego
function start() {
    restart()
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop, 32)
}
//start()




