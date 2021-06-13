// Constructors
function Ball() {
  this.radius = 10
  this.x = canvas.width/2
  this.y = canvas.height-30
  this.color = '#0095dd'
  this.randomColor = getRandomColor()
  this.baseSpeed = 3
  this.speedX = this.baseSpeed
  this.speedY = -this.baseSpeed
  this.speed = Math.sqrt(this.speedX**2 + this.speedY**2)
}

function Paddle() {
  this.height = 10
  this.width = 75
  this.color = '#0095DD'
  this.x = (canvas.width-this.width)/2
  this.speedX = 7
}

function Brick() {
  this.height = 20
  this.width = 75
  this.color = '#0095DD'
  this.rows = 3
  this.columns = 5
  this.padding = 10
  this.offsetTop = 30
  this.offsetLeft = 30
  this.scoreValue = 2
}