// Constructors
function Ball() {
  this.radius = 10
  this.x = canvas.width/2
  this.y = canvas.height-30
  this.randomColor = getRandomColor()
  this.baseSpeed = 3
  this.speedX = this.baseSpeed
  this.speedY = -this.baseSpeed
  this.speed = Math.sqrt(this.speedX**2 + this.speedY**2)
}

function Brick() {
  this.height = 20
  this.width = 75
  this.rows = 3
  this.columns = 5
  this.padding = 10
  this.offsetTop = 30
  this.offsetLeft = 30
  this.scoreValue = 2
}

function Moon(){
  this.baseSize = 26
  this.height = this.baseSize
  this.width = this.baseSize
  this.x = canvas.width-100
  this.y = 60
  this.speedX = 0.05
}

function Paddle() {
  this.height = 10
  this.width = 75
  this.x = (canvas.width-this.width)/2
  this.speedX = 7
}