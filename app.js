// DOM
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

// Ball Variables
let ballRadius = 10
let ballColor = '#0095dd'
let randomBallColor = getRandomColor();
let ballX = canvas.width/2
let ballY = canvas.height-30
let ballSpeedX = 2
let ballSpeedY = -2

// Paddle Variables
let paddleHeight = 10
let paddleWidth = 75
let paddleColor = '#0095DD'
let paddleX = (canvas.width-paddleWidth)/2
let paddleSpeed = 7

// Brick Variables
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickColor = '#0095DD'
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30
let bricks = []
// Loops through and creates the approriate amount of columns and rows of bricks
for(let c = 0; c < brickColumnCount; c++){
  bricks[c] = []
  for(var r=0; r < brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0}
  }
}

// Control Variables
let rightPressed = false
let leftPressed = false

// Event Listeners and Handlers
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = true
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft'){
    leftPressed = true
  }
}

function keyUpHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = false
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft'){
    leftPressed = false
  }
}

// Draws the ball
function drawBall(){
  ctx.beginPath()
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
  // ctx.fillStyle = ballColor
  ctx.fillStyle = randomBallColor
  // ctx.fillStyle = getRGBGridColor('g', 'b')
  ctx.fill()
  ctx.closePath()
}

// Draws the paddle
function drawPaddle(){
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = paddleColor
  ctx.fill()
  ctx.closePath()
}

// Draw a bricks
function drawBricks(){
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
      let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
      bricks[c][r].x = brickX
      bricks[c][r].y = brickY
      ctx.beginPath()
      ctx.rect(brickX, brickY, brickWidth, brickHeight)
      ctx.fillStyle = brickColor
      ctx.fill()
      ctx.closePath()
    }
  }
}

// General draw function
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  drawBricks()

  // Checks to see if a button has been pressed
  if(rightPressed){
    paddleX += paddleSpeed
    // Checks to make sure it isn't hitting a boundary
    if(paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth
    }
  }
  else if(leftPressed){
    paddleX -= paddleSpeed
    // Checks to make sure it isn't hitting a boundary
    if(paddleX < 0){
      paddleX = 0
    }
  }

  // Checks to see if the ball is hitting a boundary. If so, bounces it off
  if(ballX + ballSpeedX > canvas.width-ballRadius || ballX + ballSpeedX < ballRadius ){
    ballSpeedX = -ballSpeedX
    randomBallColor = getRandomColor()
  }
  if(ballY + ballSpeedY < ballRadius ){
    ballSpeedY = -ballSpeedY
    randomBallColor = getRandomColor()
  }
  else if(ballY + ballSpeedY > canvas.height-ballRadius){
    // If the balls hits the paddle, bounces back up and speeds up the ball and player
    if(ballX > paddleX && ballX < paddleX + paddleWidth){
      paddleSpeed += 0.25
      if(ballSpeedX > 0) ballSpeedX += 0.5
      else if(ballSpeedX < 0) ballSpeedX -= 0.5
      ballSpeedY += 0.5
      ballSpeedY = -ballSpeedY
    }
    // If the balls hits the bottom wall, game over
    else {
      alert('GAME OVER')
      document.location.reload()
      clearInterval(interval)
    }
  }

  ballX += ballSpeedX
  ballY += ballSpeedY
}
// Calls draw every 10 miliseconds
var interval = setInterval(draw, 10)

// Returns a random color as a hexcode
function getRandomColor(){
  let validChars = '0123456789ABCDEF'
  let color = '#'
  for(i = 0; i < 6; i++){
    color += validChars[Math.floor(Math.random() * 16)]
  }
  return color
}

// Returns a color based on the x and y coordinates, arguments choose to either to r, g, and/or b
function getRGBGridColor(xColor, yColor){
  let defaultValue = 50
  let red = defaultValue
  let green = defaultValue
  let blue = defaultValue

  // Checks what color the first variable is, makes sure the second is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(xColor.toLowerCase() == 'r' && yColor.toLowerCase != 'r') red = ballX + defaultValue
  else if(xColor.toLowerCase() == 'g' && yColor.toLowerCase != 'g') green = ballX + defaultValue
  else if(xColor.toLowerCase() == 'b' && yColor.toLowerCase != 'b') blue = ballX + defaultValue
  else return ballColor

  // Checks what color the second variable is, makes sure the first is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(yColor.toLowerCase() == 'r' && xColor.toLowerCase != 'r') red = ballY + defaultValue
  else if(yColor.toLowerCase() == 'g' && xColor.toLowerCase != 'g') green = ballY + defaultValue
  else if(yColor.toLowerCase() == 'b' && xColor.toLowerCase != 'b') blue = ballY + defaultValue
  else return ballColor

  return `rgb(${red}, ${green}, ${blue})`
}

// // Red Rectangle
// ctx.beginPath()
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = '#ff0000'
// ctx.fill()
// ctx.closePath()

// // Green Circle
// ctx.beginPath()
// ctx.arc(240, 160, 20, 0, Math.PI*2, false)
// ctx.fillStyle = 'green'
// ctx.fill()
// ctx.closePath()

// // Blue Outlined Rectangle
// ctx.beginPath()
// ctx.rect(160, 10, 100, 40)
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
// ctx.stroke()
// ctx.closePath()