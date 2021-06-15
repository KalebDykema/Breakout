function endGame(winStatus){
  if(winStatus == 'win'){
    alert(`YOU WIN\nScore: ${score}`)
  }
  else if(winStatus == 'lose'){
    drawGameOver()
    gameOver = true
  }
}