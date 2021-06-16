// Game Objects
let ball = new Ball()
let brick = new Brick()
let bricks = []
let button = new Button()
let buttons = []
let moon = new Moon()
let paddle = new Paddle()

// Game Variables
let score = 0
let lives = 2
let bounceMultiplier = 2
let rightPressed = false
let leftPressed = false
let recentlyCollided = false
let onMenu = true
let ballShot = false
let gameOver = false

// General font Variables
let fontSize = 16
let fontFamily = 'Arial'
let fontColor = 'white'
let font = `${fontSize}px ${fontFamily}`
let textPadding = 8

// Title Font Variables
let titleFontSize = 24
let titleFontFamily = 'Arial'
let titleFontColor = 'limegreen'
let titleFont = `${titleFontSize}px ${titleFontFamily}`

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

// Loop through and create appropriate amount of buttons
for(let r = 0; r < button.rows; r++){
  buttons[r] = {
    x: 0,
    y: 0,
    text: '',
    path: ''
  }
}

// Primary Rendering Function
function draw(){
  // Clears the canvas on every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Draw functions for main menu
  drawMoon()
  drawTitle()
  drawButtons()

  // Draw functions once game starts
  if(!onMenu){
    if(!ballShot) drawStart()
    drawScore()
    drawLives()
    drawBall()
    drawPaddle()
    drawBricks()

    // Game logic functions
    collisionDetection()
    movementControls()
  }
  positionUpdating()

  // Starts a new frame and re-calls the draw function
  if(!gameOver) requestAnimationFrame(draw)
}
// Init call
draw()