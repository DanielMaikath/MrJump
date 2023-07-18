//Clase constructora de player

function Player(x, y, parent) {
  var self = this
  this.x = x;
  this.y = y;
  this.direction = 0
  this.height = 50
  this.width = 50
  this.speedX = 2
  this.speedY = 38
  this.collition = false
  this.sprite = document.createElement("div")

  this.insertPlayer = function () { // Función encargada de insertar al player en el DOM
    this.sprite.setAttribute('id', 'player')
    this.sprite.style.left = this.x + 'px'
    this.sprite.style.top = this.y + 'px'
    parent.appendChild(this.sprite)
  }
  this.move = function () { // Función encargada de mover al jugador horizontalmente
    //Esta es la parte de movimiento horizontal
    self.x = self.x + self.speedX * self.direction
    if (self.x <= 450 && self.x >= 0) {
      self.sprite.style.left = self.x + 'px'
    }
    //Esta es la parte del movimiento vertical
    if (self.y == 750) { self.speedY = 38 }
    if (self.collition == true) {
      self.speedY = 38
      self.collition = false
    }

    if (self.collition == false) {
      self.y = self.y - self.speedY
      if (self.y <= 750 && self.y >= 0) {
        self.sprite.style.top = self.y + 'px'
      }
    }
    self.speedY -= 2
  }
  //Colisiones


}









export { Player }