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
let fontColor = 'white'
let rightPressed = false
let leftPressed = false
let recentlyCollided = false
let ballShot = false

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
  drawMoon()
  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
  drawLives()
  collisionDetection()


  movementControls()

  // // Checks to see if the ball is hitting a boundary. If so, bounces it off
  // if(ball.x + ball.speedX > canvas.width-ball.radius || ball.x + ball.speedX < ball.radius ){
  //   ball.speedX = -ball.speedX
  //   ball.randomColor = getRandomColor()
  // }
  // if(ball.y + ball.speedY < ball.radius ){
  //   ball.speedY = -ball.speedY
  //   ball.randomColor = getRandomColor()
  // }

  // // If the balls hits the bottom wall, removes a life or ends the game if there's no lives left
  // else if(ball.y + ball.speedY > canvas.height-ball.radius){
  //   lives--
  //   if(!lives){
  //     alert('GAME OVER')
  //     document.location.reload()
  //     requestAnimationFrame(draw)
  //   }
  //   else{
  //     ball.speedX = ball.baseSpeed
  //     ball.speedY = -ball.baseSpeed
  //     ball.x = paddle.x+(paddle.width/2)
  //     ball.y = canvas.height-(paddle.height)
  //     // paddle.x = (canvas.width-paddle.width)
  //   }
  // }

  // Position Adjustments based on speed
  if(ballShot){
    ball.x += ball.speedX
    ball.y += ball.speedY
  }
  // Sets the ball's position to above the paddle
  else{
    ball.x = paddle.x+(paddle.width/2)
    ball.y = canvas.height-(paddle.height*2)
  }

  // If the moon goes off the screen, pushes it back to the other side
  if(moon.x < 0 - moon.width){
    moon.x = canvas.width+moon.width
  }

  moon.x -= moon.speedX

  requestAnimationFrame(draw)
}
draw()