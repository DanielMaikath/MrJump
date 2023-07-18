import { Player } from "./player.js";

function Platform(x, y, parent, player) {
  var self = this
  this.x = x;
  this.y = y;
  this.direction = 0
  this.height = 100
  this.width = 25
  this.sprite = document.createElement("div")

  this.insertPlatform = function () {
    this.sprite.setAttribute('class', 'platform')
    this.sprite.style.left = this.x + 'px'
    this.sprite.style.top = this.y + 'px'
    parent.appendChild(this.sprite)
  }

  //Colisiones
  this.checkCollitions = function () {
    if (
      this.y + this.height >= player.y &&
      this.y <= player.y + player.height &&
      this.x + this.width >= player.x &&
      this.x <= player.x + player.width
    ) {
      console.log("ouch")
  return true
  }
}
}



export { Platform }