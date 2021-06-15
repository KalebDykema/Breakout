function positionUpdating(){
  // Ball position adjustments based on speed
  if(ballShot){
    ball.x += ball.speedX
    ball.y += ball.speedY
  }
  // Sets the ball's position to above the paddle for the start of the game
  else{
    ball.x = paddle.x+(paddle.width/2)
    ball.y = canvas.height-(paddle.height*2)
  }

  // If the moon goes off the screen, pushes it back to the other side
  if(moon.x < 0 - moon.width){
    moon.x = canvas.width+moon.width
  }

  moon.x -= moon.speedX
}