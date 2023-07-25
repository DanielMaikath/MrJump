function Coin(x,y,parent,player,platforms) {
    var self = this;
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
    this.sprite = document.createElement("div")
    this.timerId = null
    this.scrolling = false
    this.removed = false
    this.shouldScroll = true

    
    
    this.insertCoin = function () {
        platforms.forEach(function(plataforma){
            if( self.y <= plataforma.y + plataforma.height &&
                self.y + self.height >= plataforma.y &&
                self.x + self.width >= plataforma.x &&
                self.x <= plataforma.x + plataforma.width &&
                self.y <= player.y + player.height &&
                self.y + self.height >= player.y &&
                self.x + self.width >= player.x &&
                self.x <= player.x + player.width ){
            } else {
                self.sprite.setAttribute('class', 'coin')
                self.sprite.style.left = self.x + 'px'
                self.sprite.style.top = self.y + 'px'
                parent.appendChild(self.sprite)
            }
        })


        
      }

    this.checkCollitions = function (coins) {
        if (
          this.y <= player.y + player.height &&
          this.y + this.height >= player.y &&
          this.x + this.width >= player.x &&
          this.x <= player.x + player.width &&
          !this.removed
        ) {
          parent.removeChild(this.sprite)
          this.scrolling = false
          this.removed = true
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
    this.stopScroll = function(){
        if(!self.removed){
            clearInterval(this.timerId)
            this.shouldScroll = false
            this.scrolling = false
        }
     }
}

}
export{Coin}