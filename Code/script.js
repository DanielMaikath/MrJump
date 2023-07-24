import { Player } from "./player.js"
import { Platform } from "./platform.js"
const board = document.getElementById("board")
const player = new Player(225, 450, board)
const platform = new Platform(150, 550, board, player)
const platform2 = new Platform(250, 200, board, player)
const startButton = document.getElementById("start")
const pantalla = document.getElementById("pantalla-inicial")
const title = document.getElementById("title")
const froakie = document.getElementById("froakie")
let platforms = [platform, platform2]
let timerId //Variable global que almacena el id del intervalo
var shouldCreatePlatform = true
let score = 0
let scoreBoard = document.createElement("div")
let top = false


let soundStart = new Audio('music/musicStart.mp3')
soundStart.volume = 0.5
soundStart.play()
let soundGame = new Audio('music/musicGame.mp3')
soundGame.volume = 0.15
let soundGameOver = new Audio('music/musicGameOver.mp3')
soundGameOver.volume = 0.05
let sounJump = new Audio('music/soundJump.mp3')


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
    console.log(platforms)
    if(player.isDead){
       gameOver()
       soundGame.pause()
       soundGameOver.play()
    }
    if(platforms[0].y >= 800){
        platforms.shift()
    }
    player.move()
    if (platformCollition()) { 
        player.collition = true
        sounJump.play()
    }
    /* if(player.y <= 100){
        player.playerIsOnTop = true
    }  */ 
    if (player.y <= 400 ) {
        platformScroll()
        shouldCreatePlatform = true
        scrollStatus()
    } 
    if (player.y > 400 ) { //Para el scroll de plataformas al bajar de la mitad de la pantalla
        stopPlatformScroll()
    } 
    if (platforms[platforms.length-1].y > 250) { //Una vez la ultima plataforma generada supere los 250px genera una nueva
        if(shouldCreatePlatform ){
            createPlatform()
        }
        scrollStatus()
    }
   /*  if (player.y <= 0 && player.speedY > 0 && top) {
        scrollStatus()
        createPlatform()
        platformScroll()
        top = false
    }
    if (player.speedY < 0) {
        top = true
    } */
    scoreBoard.innerText = score++
    
    
}

function createPlatform() {
    let cordX = Math.floor(Math.random() * 425)
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
        plataforma.scroll()
        
        
  

    })
}

//Funcion que haga scroll de todas las plataformas
function stopPlatformScroll() {
    platforms.forEach(function (plataforma) {
            plataforma.stopScroll()
        

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
    console.log(title)
    pantalla.removeChild(e.currentTarget)
    pantalla.removeChild(title)
    pantalla.removeChild(froakie)
    board.removeChild(pantalla)
    scoreBoard.setAttribute("id", "score-board")
    board.appendChild(scoreBoard)
    soundStart.pause()
    soundGame.play()
    soundGameOver.currentTime = 0
    
    
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
    console.log(platforms)
    deletePlatfoms()
    }
    board.removeChild(player.sprite)
    pantalla.setAttribute("id","game-over")
    board.appendChild(pantalla)
    pantalla.appendChild(title)
    title.setAttribute("id","score-game-over")
    title.innerText = `Your score ${score}`
    startButton.setAttribute("id","reset-button")
    startButton.innerText = "Restart"
    board.removeChild(scoreBoard)
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
    score = 0
    soundGame.currentTime = 0
    
    
}
//Función que comienza el juego
function start() {
    restart()
    player.insertPlayer()
    platform.insertPlatform()
    platform2.insertPlatform()
    timerId = setInterval(gameLoop, 32)
    soundGameOver.pause()
    soundStart.currentTime = 0
}
//start()




