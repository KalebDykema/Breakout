// DOM Objects
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

// Sprites
let ballSprite = new Image()
let brickSprite = new Image()
let moonSprite = new Image()
let paddleSprite = new Image()
ballSprite.src = './img/ball.png'
brickSprite.src = './img/brick.png'
moonSprite.src = './img/moon.png'
paddleSprite.src = './img/paddle.png'

// Draws the ball
function drawBall(){
  ctx.drawImage(ballSprite, ball.x-ball.radius, ball.y-ball.radius, ball.radius*2, ball.radius*2)
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
        ctx.drawImage(brickSprite, brickX, brickY, brick.width, brick.height)
      }
    }
  }
}

// Draws the lives
function drawLives(){
  ctx.font = '16px Arial'
  ctx.fillStyle = fontColor
  ctx.fillText(`Lives: ${lives}`, canvas.width-65, 20)
}

function drawMoon(){
  ctx.drawImage(moonSprite, moon.x, moon.y, moon.width, moon.height)
}

// Draws the paddle
function drawPaddle(){
  ctx.drawImage(paddleSprite, paddle.x, canvas.height-paddle.height, paddle.width, paddle.height)
}

// Draws the score
function drawScore(){
  ctx.font = '16px Arial'
  ctx.fillStyle = fontColor
  ctx.fillText(`Score: ${score}`, 8, 20)
}