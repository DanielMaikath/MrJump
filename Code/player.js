//Clase constructora de player


function Player(x,y,parent){
    var self = this
    this.x = x ;
    this.y = y ;
    this.direction = 0
    this.height = 50
    this.width = 50
    this.speed = 2
    this.sprite = document.createElement("div")

    this.insertPlayer = function () { // Función encargada de insertar al player en el DOM
        this.sprite.setAttribute('id', 'player')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
      }
    this.move = function(){ // Función encargada de mover al jugador horizontalmente
      console.log(self.x)
      self.x = self.x + self.speed * self.direction
      if(self.x <= 450 && self.x >=0){
      self.sprite.style.left = self.x + 'px' 
    }
    }

}









export{Player}