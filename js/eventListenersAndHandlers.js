// Event Listeners and Handlers
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

function keyDownHandler(e){
  // Movement
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = true
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft'){
    leftPressed = true
  }
}

function keyUpHandler(e){
  // Movement
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = false
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft'){
    leftPressed = false
  }

  // Shoot the ball
  if(e.key == ' ' || e.key == 'Spacebar'){
    ballShot = true
    console.log(ballShot)
  }
}

function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > paddle.width/2 && relativeX < canvas.width-paddle.width/2){
    paddle.x = relativeX - paddle.width/2
  }
}