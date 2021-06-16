// Game Objects
let ball = new Ball()
let brick = new Brick()
let bricks = []
let moon = new Moon()
let paddle = new Paddle()

// Game Variables
let score = 0
let lives = 2
let bounceMultiplier = 2
let rightPressed = false
let leftPressed = false
let recentlyCollided = false
let ballShot = false
let gameOver = false

// General font Variables
let fontSize = 16
let fontFamily = 'Arial'
let fontColor = 'white'
let font = `${fontSize}px ${fontFamily}`
let textPadding = 8

// Loops through and creates the appropriate amount of columns and rows of bricks
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
  // Clears the canvas on every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if(!ballShot) drawStart()
  drawMoon()
  drawScore()
  drawLives()
  drawBall()
  drawPaddle()
  drawBricks()

  // Game logic functions
  collisionDetection()
  movementControls()
  positionUpdating()

  // Starts a new frame and re-calls the draw function
  if(!gameOver) requestAnimationFrame(draw)
}
// Init call
draw()