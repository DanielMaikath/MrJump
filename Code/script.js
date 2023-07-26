import { Player } from "./player.js"
import { Platform } from "./platform.js"
import { Coin } from "./coin.js"
const board = document.getElementById("board")
const player = new Player(225, 400, board)
const platform = new Platform(200, 550, board, player)
const platform2 = new Platform(250, 200, board, player)
const startButton = document.getElementById("start")
const pantalla = document.getElementById("pantalla-inicial")
const title = document.getElementById("title")
const froakie = document.getElementById("froakie")
let sadFroakie = document.createElement("img")
sadFroakie.setAttribute("src","Code/images/kisspng-stuffed-animals-cuddly-toys-jan-25-2017-plush-f-boke-5b2de366a66c27.0354764415297339906817.png")
sadFroakie.setAttribute("id","sad-froakie")
let platforms = [platform, platform2]
let coins = [new Coin(200,400,board,player,platforms)]
let timerId //Variable global que almacena el id del intervalo
var shouldCreatePlatform = true
let shouldCreateCoin = true
let score = 0
let scoreBoard = document.createElement("div")
let firstExecution = true
let top = false
let coinCount = 1;



let soundStart = new Audio('Code/music/musicStart.mp3')
soundStart.volume = 0.5
soundStart.play()
let soundGame = new Audio('Code/music/musicGame.mp3')
soundGame.volume = 0.15
let soundGameOver = new Audio('Code/music/musicGameOver.mp3')
soundGameOver.volume = 0.05
let sounJump = new Audio('Code/music/soundJump.mp3')
let soundCoints = new Audio('Code/music/coints.mp3')
soundCoints.volume = 0.25

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
       soundGame.pause()
       soundGameOver.play()
    }
    if(platforms[0].y >= 775){
        platforms.shift()
    }
    
    if(coins[0].y >= 775  ){
        coins.shift()
    } 
    player.move()
    if (platformCollition()) { 
        player.collition = true
        sounJump.play()
    }
    if(coinCollition()){
        score += 50
        scoreBoard.innerText = score
        soundCoints.play()
    } 
    /* if(player.y <= 100){
        player.playerIsOnTop = true
    }  */ 
    if (player.y <= 400 ) {
        platformScroll()
        coinScroll()
        shouldCreatePlatform = true
        scrollStatus()
        scrollStatusCoins()
        shouldCreateCoin = true 
    } 
    if (player.y > 400 ) { //Para el scroll de plataformas al bajar de la mitad de la pantalla
        stopPlatformScroll()
        stopCoinScroll() 
    } 
    if (coins[coins.length-1].y > 250) { //Una vez la ultima plataforma generada supere los 250px genera una nueva
        if(shouldCreateCoin ){
            createCoin()
        }
        scrollStatusCoins()
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

function createCoin(){
    let cordX = Math.floor(Math.random() * 425)
    let cordY = -50
    let localCoin = new Coin(cordX,cordY,board,player,platforms)
    localCoin.insertCoin()
    coins.push(localCoin)
    localCoin.shouldScroll = true
    shouldCreateCoin = true
    
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

function coinCollition() {
    let arr = []
    coins.forEach(function (moneda) {
        arr.push(moneda.checkCollitions())
    })
    return arr.includes(true)
}

//Funcion que haga scroll de todas las plataformas
function coinScroll() {
    coins.forEach(function (moneda) {
        moneda.scroll()
        
        
  

    })
}

//Funcion que haga scroll de todas las plataformas
function stopCoinScroll() {
    coins.forEach(function (moneda) {
        if(moneda && !moneda.removed){
            moneda.stopScroll()
    }

    })
}



//Funcion que cambie los ShouldScroll a true
function scrollStatusCoins() {
    coins.forEach(function (moneda) {
        moneda.shouldScroll = true
    })
}
function deleteCoins(){
    coins.forEach(function (moneda) {
        if(!moneda.removed){
        moneda.sprite.parentNode.removeChild(moneda.sprite)
    }
    })
}
//Evento que inicia el juego
startButton.addEventListener("click",function(e){
    pantalla.removeChild(e.currentTarget)
    pantalla.removeChild(title)
    if(firstExecution){
    pantalla.removeChild(froakie)
    firstExecution = false
    }
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
    clearInterval(timerId)
    if(platforms.length > 0){
        deletePlatfoms()
    }
    if(coins.length > 0){
        deleteCoins()
    }
    board.removeChild(player.sprite)
    pantalla.setAttribute("id","game-over")
    board.appendChild(pantalla)
    pantalla.appendChild(title)
    title.setAttribute("id","score-game-over")
    title.innerText = `Your score ${score}`
    startButton.setAttribute("id","reset-button")
    startButton.innerText = "Restart"
    pantalla.appendChild(sadFroakie)
    board.removeChild(scoreBoard)
    pantalla.appendChild(startButton)
}

//Funcion Restart
function restart(){
    platform.x = 200
    platform.y = 550
    platform2.x = 250
    platform2.y = 250
    player.x = 225
    player.y = 400
    player.isDead = false
    platform.removed = false
    platform2.removed = false
    platforms = [platform, platform2]
    coins = [new Coin(200,400,board,player,platforms)]
    shouldCreatePlatform = true
    score = 0
    soundGame.currentTime = 0
    
}
//Función que comienza el juego
function start() {
    restart()
    console.log("funcioonas")
    platform.insertPlatform()
    platform2.insertPlatform()
    coins[0].insertCoin()
    player.insertPlayer()
    timerId = setInterval(gameLoop, 32)
    soundGameOver.pause()
    soundStart.currentTime = 0
}
//start()




