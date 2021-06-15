// When the player loses
function gameOver(){
  drawGameOver()
  alert('GAME OVER')
  document.location.reload()
  requestAnimationFrame(draw)
}

// When the player wins
function winGame(){
  alert(`YOU WIN\nScore: ${score}`)
  document.location.reload()
  requestAnimationFrame(draw) 
}