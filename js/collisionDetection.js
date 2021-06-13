// Collision Detection
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