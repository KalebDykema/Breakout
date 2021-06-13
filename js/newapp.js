// DOM
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

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
  this.width = 75
  this.height = 20
  this.color = '#0095DD'
  this.rows = 3
  this.columns = 5
  this.padding = 10
  this.offsetTop = 30
  this.offsetLeft = 30
  this.scoreValue = 2
}

// Objects and Variables
let ball = new Ball()
let brick = new Brick()
let bricks = []
let paddle = new Paddle()
let score = 0
let lives = 2
let bounceMultiplier = 2
let rightPressed = false
let leftPressed = false

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
  if(relativeX > paddle.width/2 && relativeX < canvas.width-paddle.width/2){
    paddle.x = relativeX - paddle.width/2
  }
}

// Collision detection calculations
function collisionDetection(){
  // Paddle Detection
  if(ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width && ball.y + ball.radius> canvas.height-(paddle.height/2) && ball.y - ball.radius < (canvas.height-(paddle.height/2)) + paddle.height){
    ball.speedX = ((ball.x-paddle.x-(paddle.width/2))/paddle.width)*ball.baseSpeed*bounceMultiplier
    ball.speedY = Math.sqrt(ball.speed**2 - ball.speedX**2)
    ball.speedY = -ball.speedY
  }

  // Brick Detections
  for(var c = 0; c < brick.columns; c++){
    for(var r = 0; r < brick.rows; r++){
      // Ball will only bounce if the brick hasn't been hit
      if(bricks[c][r].status == 1){
        let b = bricks[c][r]
        if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius> b.y && ball.y - ball.radius < b.y + brick.height){
          bricks[c][r].status = 0
          ball.randomColor = getRandomColor()
          score += brick.scoreValue
          ball.speedY = -ball.speedY
          if(score == brick.rows * brick.columns * brick.scoreValue){
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
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
  ctx.fillStyle = ball.randomColor
  ctx.fill()
  ctx.closePath()
}

// Draws the paddle
function drawPaddle(){
  ctx.beginPath()
  ctx.rect(paddle.x, canvas.height-paddle.height, paddle.width, paddle.height)
  ctx.fillStyle = paddle.color
  ctx.fill()
  ctx.closePath()
}

// Draw a bricks
function drawBricks(){
  for(var c = 0; c < brick.columns; c++){
    for(var r = 0; r < brick.rows; r++){
      // Only draws the brick if it's status is at 1, AKA it hasn't been hit
      if(bricks[c][r].status == 1){
        let brickX = (c * (brick.width + brick.padding)) + brick.offsetLeft
        let brickY = (r * (brick.height + brick.padding)) + brick.offsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brick.width, brick.height)
        ctx.fillStyle = brick.color
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
    paddle.x += paddle.speedX
    // Checks to make sure it isn't hitting a boundary
    if(paddle.x + paddle.width > canvas.width){
      paddle.x = canvas.width - paddle.width
    }
  }
  else if(leftPressed){
    paddle.x -= paddle.speedX
    // Checks to make sure it isn't hitting a boundary
    if(paddle.x < 0){
      paddle.x = 0
    }
  }

  // Checks to see if the ball is hitting a boundary. If so, bounces it off
  if(ball.x + ball.speedX > canvas.width-ball.radius || ball.x + ball.speedX < ball.radius ){
    ball.speedX = -ball.speedX
    ball.randomColor = getRandomColor()
  }
  if(ball.y + ball.speedY < ball.radius ){
    ball.speedY = -ball.speedY
    ball.randomColor = getRandomColor()
  }
  // If the balls hits the bottom wall, removes a life or ends the game if there's no lives left
  else if(ball.y + ball.speedY > canvas.height-ball.radius){
    lives--
    if(!lives){
      alert('GAME OVER')
      document.location.reload()
      requestAnimationFrame(draw)
    }
    else{
      ball.x = canvas.width/2
      ball.y = canvas.height-30
      ball.speedX = 2
      ball.speedY = -2
      paddle.x = (canvas.width-paddle.width)/2
    }
  }

  ball.x += ball.speedX
  ball.y += ball.speedY

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
  if(xColor.toLowerCase() == 'r' && yColor.toLowerCase != 'r') red = ball.x + defaultValue
  else if(xColor.toLowerCase() == 'g' && yColor.toLowerCase != 'g') green = ball.x + defaultValue
  else if(xColor.toLowerCase() == 'b' && yColor.toLowerCase != 'b') blue = ball.x + defaultValue
  else return ball.color

  // Checks what color the second variable is, makes sure the first is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(yColor.toLowerCase() == 'r' && xColor.toLowerCase != 'r') red = ball.y + defaultValue
  else if(yColor.toLowerCase() == 'g' && xColor.toLowerCase != 'g') green = ball.y + defaultValue
  else if(yColor.toLowerCase() == 'b' && xColor.toLowerCase != 'b') blue = ball.y + defaultValue
  else return ball.color

  return `rgb(${red}, ${green}, ${blue})`
}