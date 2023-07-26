import { Player } from "./player.js";

function Platform(x, y, parent, player) {
  var self = this //La variable self almacena el valor de this, para poder ser usado al llamar otras funciones
  this.x = x;
  this.y = y;
  this.direction = 0 //Dirección en la que se mueve horizontalmente , +1 es a la derecha y -1 es a la izquierda
  this.height = 25
  this.width = 75
  this.shouldScroll = true
  this.sprite = document.createElement("div")
  this.timerId = null
  this.scrolling = false
  this.removed = false

  //Función que inserta la plataforma en el DOM
  this.insertPlatform = function () {
    this.sprite.setAttribute('class', 'platform')
    this.sprite.style.left = this.x + 'px'
    this.sprite.style.top = this.y + 'px'
    parent.appendChild(this.sprite)
  }

  //Función que checkea las colisiones de la plataforma con el jugador
  this.checkCollitions = function () {
    if (
      this.y <= player.y + player.height &&
      this.y >= player.y &&
      this.x + this.width >= player.x &&
      this.x <= player.x + player.width &&
      player.speedY < 0
    ) {
      return true
    } else {
      return false
    }
  }

  this.scroll = function () { // Función que se encarga de scrollear la pantalla
    if (self.shouldScroll && !self.scrolling) {
      self.scrolling = true
      self.timerId = setInterval(function(){
        self.y = self.y + 10
        self.sprite.style.top = self.y + 'px'
        if (self.y >= 775 && !self.removed) {
          parent.removeChild(self.sprite)
          self.removed = true
        }
      },30)
    } 
  
  }

  this.stopScroll = function(){
    clearInterval(this.timerId)
    this.shouldScroll = false
    this.scrolling = false
 }

}

export { Platform }



/*   if (player.playerIsOnTop){
      self.y = self.y + 75
     self.sprite.style.top = self.y + 'px'
     player.playerIsOnTop = false
     }  */
    