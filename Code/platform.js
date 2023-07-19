import { Player } from "./player.js";

function Platform(x, y, parent, player) {
  var self = this //La variable self almacena el valor de this, para poder ser usado al llamar otras funciones
  this.x = x;
  this.y = y;
  this.direction = 0 //Dirección en la que se mueve horizontalmente , +1 es a la derecha y -1 es a la izquierda
  this.height = 25 
  this.width = 100
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
      this.x <= player.x + player.width
    ) {
  return true
  }
}
}



export { Platform }