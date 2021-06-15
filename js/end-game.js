function endGame(winStatus){
  if(winStatus == 'win'){
    drawYouWin()
    gameOver = true
  }
  else if(winStatus == 'lose'){
    drawGameOver()
    gameOver = true
  }
}