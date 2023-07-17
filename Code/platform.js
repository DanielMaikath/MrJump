function Platform(x,y,parent){
    var self = this
    this.x = x ;
    this.y = y ;
    this.direction = 0
    this.height = 100
    this.width = 25
    this.sprite = document.createElement("div")

    this.insertPlatform = function (){
        this.sprite.setAttribute('class', 'platform')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
      }
    }

    export{Platform}