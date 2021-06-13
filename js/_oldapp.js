// DOM
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

// Ball Variables
let ballRadius = 10
let ballColor = '#0095dd'
let randomBallColor = getRandomColor()
let ballX = canvas.width/2
let ballY = canvas.height-30
let ballSpeed = 3
let ballSpeedX = ballSpeed
let ballSpeedY = -ballSpeed
let ballSpeedVelocity = Math.sqrt(ballSpeedX**2 + ballSpeedY**2)

// Paddle Variables
let paddleHeight = 10
let paddleWidth = 75
let paddleColor = '#0095DD'
let paddleX = (canvas.width-paddleWidth)/2
let paddleSpeed = 7

// Brick Variables
let brickScore = 2
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
    bricks[c][r] = {
      x: 0, 
      y: 0, 
      status: 1
    }
  }
}

// Other Variables
let score = 0
let lives = 2
let bounceMultiplier = 2
let rightPressed = false
let leftPressed = false

// Event Listeners and Handlers
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

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

function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > paddleWidth/2 && relativeX < canvas.width-paddleWidth/2){
    paddleX = relativeX - paddleWidth/2
  }
}

// Collision detection calculations
function collisionDetection(){
  // Paddle Detection
  if(ballX + ballRadius > paddleX && ballX - ballRadius < paddleX + paddleWidth && ballY + ballRadius> canvas.height-(paddleHeight/2) && ballY - ballRadius < (canvas.height-(paddleHeight/2)) + paddleHeight){
    ballSpeedX = ((ballX-paddleX-(paddleWidth/2))/paddleWidth)*ballSpeed*bounceMultiplier
    ballSpeedY = Math.sqrt(ballSpeedVelocity**2 - ballSpeedX**2)
    ballSpeedY = -ballSpeedY
  }

  // Brick Detections
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      // Ball will only bounce if the brick hasn't been hit
      if(bricks[c][r].status == 1){
        let b = bricks[c][r]
        if(ballX + ballRadius > b.x && ballX - ballRadius < b.x + brickWidth && ballY + ballRadius> b.y && ballY - ballRadius < b.y + brickHeight){
          bricks[c][r].status = 0
          randomBallColor = getRandomColor()
          score += brickScore
          ballSpeedY = -ballSpeedY
          if(score == brickRowCount * brickColumnCount * brickScore){
            alert(`YOU WIN\nScore: ${score}`)
            document.location.reload()
            requestAnimationFrame(draw) 
          }
        }
      }
    }
  }
}

// Draws the score
function drawScore(){
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText(`Score: ${score}`, 8, 20)
}

// Draws the lives
function drawLives(){
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText(`Lives: ${lives}`, canvas.width-65, 20)
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
      // Only draws the brick if it's status is at 1, AKA it hasn't been hit
      if(bricks[c][r].status == 1){
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
}

// General draw function
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  drawScore()
  drawLives()
  drawBricks()
  collisionDetection()

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
  // If the balls hits the bottom wall, removes a life or ends the game if there's no lives left
  else if(ballY + ballSpeedY > canvas.height-ballRadius){
    lives--
    if(!lives){
      alert('GAME OVER')
      document.location.reload()
      requestAnimationFrame(draw)
    }
    else{
      ballX = canvas.width/2
      ballY = canvas.height-30
      ballSpeedX = 2
      ballSpeedY = -2
      paddleX = (canvas.width-paddleWidth)/2
    }
  }

  ballX += ballSpeedX
  ballY += ballSpeedY

  requestAnimationFrame(draw)
}
draw()

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