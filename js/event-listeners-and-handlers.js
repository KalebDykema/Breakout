// Event Listeners and Handlers
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

function keyDownHandler(e){
  // Movement
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = true
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed = true
  }
}

function keyUpHandler(e){
  // Movement
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = false
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed = false
  }

  // Shoot the ball in a random direction upon clicking space, or start new game
  if((e.key == ' ' || e.key == 'Spacebar')){
    // Shoot ball
    if(!ballShot){
      ballShot = true
      let randomValue = Math.random() * paddle.width
      ball.speedX = ((randomValue-(paddle.width/2))/paddle.width)*ball.baseSpeed*bounceMultiplier
      ball.speedY = Math.sqrt(ball.speed**2 - ball.speedX**2)
      ball.speedY = -ball.speedY
    }
    // Start new game
    if(gameOver){
      document.location.reload()
      requestAnimationFrame(draw) 
    }
  }
}

function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > paddle.width/2 && relativeX < canvas.width-paddle.width/2){
    paddle.x = relativeX - paddle.width/2
  }
}

function movementControls(){
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
}