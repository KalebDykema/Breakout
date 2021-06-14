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
          // Makes sure another brick was not hit while looping through the array before adjusting the speed
          if(!recentlyCollided){
            ball.speedY = -ball.speedY
          }
          // Occasionally the ball will hit multiple bricks at once and get a double collision calculation. In order to figure this, this variable exists and gets set to true when the first brick is hit
          recentlyCollided = true
          setTimeout( ()=> {recentlyCollided = false}, 10 )
          bricks[c][r].status = 0
          score += brick.scoreValue
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