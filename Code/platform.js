import { Player } from "./player.js";

function Platform(x, y, parent, player) {
  var self = this //La variable self almacena el valor de this, para poder ser usado al llamar otras funciones
  this.x = x;
  this.y = y;
  this.direction = 0 //Dirección en la que se mueve horizontalmente , +1 es a la derecha y -1 es a la izquierda
  this.height = 25
  this.width = 100
  this.shouldScroll = true
  this.sprite = document.createElement("div")

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
      this.y + this.height >= player.y &&
      this.y <= player.y + player.height &&
      this.x + this.width >= player.x &&
      this.x <= player.x + player.width &&
      player.speedY <= 0
    ) {
      return true
    } else {
      return false
    }
  }

  this.scroll = function () { // Función que se encarga de scrollear la pantalla
    if (self.shouldScroll) {
      self.y = self.y + 300
      self.sprite.style.top = self.y + 'px'
      self.shouldScroll = false
    } 
    /*if (player.y <= 0){
      self.y = self.y + 10
     self.sprite.style.top = this.y + 'px'
     }*/
    if (self.y >= 800) {
      console.log(self.sprite)
      parent.removeChild(self.sprite)
      console.log("borrado")
      return true
    }else{
      return false
    }
  }
}



export { Platform }