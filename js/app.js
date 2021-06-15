// Game Objects
let ball = new Ball()
let brick = new Brick()
let bricks = []
let moon = new Moon()
let paddle = new Paddle()

// Variables
let score = 0
let lives = 2
let bounceMultiplier = 2
let font = '16px Arial'
let fontColor = 'white'
let rightPressed = false
let leftPressed = false
let recentlyCollided = false
let ballShot = false
let textPadding = 8

// Loops through and creates the approriate amount of columns and rows of bricks
for(let c = 0; c < brick.columns; c++){
  bricks[c] = []
  for(var r=0; r < brick.rows; r++){
    bricks[c][r] = {
      x: 0, 
      y: 0, 
      status: 1
    }
  }
}

// Primary Rendering Function
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if(!ballShot) drawStart()
  drawScore()
  drawLives()
  drawMoon()
  drawBall()
  drawPaddle()
  drawBricks()

  collisionDetection()
  movementControls()
  updatePositions()

  requestAnimationFrame(draw)
}
draw()