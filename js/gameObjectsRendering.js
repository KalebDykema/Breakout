// DOM Objects
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

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