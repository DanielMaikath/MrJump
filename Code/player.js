//Clase constructora de player


function Player(x,y,parent){
    this.x = x ;
    this.y = y ;
    this.height = 50
    this.width = 50
    this.sprite = document.createElement("div")

    this.insertPlayer = function () { // Función encargada de insertar al player en el DOM
        this.sprite.setAttribute('id', 'player')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
      }
    

}









export{Player}