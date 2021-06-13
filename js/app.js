// Game Objects
let ball = new Ball()
let brick = new Brick()
let bricks = []
let paddle = new Paddle()

// Variables
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

// Primary Rendering Function
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
      ball.speedX = ball.baseSpeed
      ball.speedY = -ball.baseSpeed
      paddle.x = (canvas.width-paddle.width)/2
    }
  }

  ball.x += ball.speedX
  ball.y += ball.speedY

  requestAnimationFrame(draw)
}
draw()