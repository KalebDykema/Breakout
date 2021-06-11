// DOM
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

// Ball Variables
let ballRadius = 10
let ballColor = '#0095dd'
let randomBallColor = getRandomColor();
let x = canvas.width/2
let y = canvas.height-30
let dx = 2
let dy = -2

// Paddle Variables
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2

// Draws the ball
function drawBall(){
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  // ctx.fillStyle = ballColor
  ctx.fillStyle = randomBallColor
  // ctx.fillStyle = getRGBGridColor('g', 'b')
  ctx.fill()
  ctx.closePath()
}

// Draws the paddle
function drawPaddle(){
  
}

// Returns a random color as a hexcode
function getRandomColor(){
  let validChars = '0123456789ABCDEF'
  let color = '#'
  for(i = 0; i < 6; i++){
    color += validChars[Math.floor(Math.random() * 16)]
  }
  return color
}

// Returns a color based on the x and y coordinates, arguments choose to either to r, g, and/or b
function getRGBGridColor(xColor, yColor){
  let defaultValue = 50
  let red = defaultValue
  let green = defaultValue
  let blue = defaultValue

  // Checks what color the first variable is, makes sure the second is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(xColor.toLowerCase() == 'r' && yColor.toLowerCase != 'r') red = x + defaultValue
  else if(xColor.toLowerCase() == 'g' && yColor.toLowerCase != 'g') green = x + defaultValue
  else if(xColor.toLowerCase() == 'b' && yColor.toLowerCase != 'b') blue = x + defaultValue
  else return ballColor

  // Checks what color the second variable is, makes sure the first is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(yColor.toLowerCase() == 'r' && xColor.toLowerCase != 'r') red = y + defaultValue
  else if(yColor.toLowerCase() == 'g' && xColor.toLowerCase != 'g') green = y + defaultValue
  else if(yColor.toLowerCase() == 'b' && xColor.toLowerCase != 'b') blue = y + defaultValue
  else return ballColor

  return `rgb(${red}, ${green}, ${blue})`
}

// General draw function
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius ){
    dx = -dx
    randomBallColor = getRandomColor()
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius ){
    dy = -dy
    randomBallColor = getRandomColor()
  }

  x += dx
  y += dy
}
// Calls draw every 10 miliseconds
setInterval(draw, 10)

// // Red Rectangle
// ctx.beginPath()
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = '#ff0000'
// ctx.fill()
// ctx.closePath()

// // Green Circle
// ctx.beginPath()
// ctx.arc(240, 160, 20, 0, Math.PI*2, false)
// ctx.fillStyle = 'green'
// ctx.fill()
// ctx.closePath()

// // Blue Outlined Rectangle
// ctx.beginPath()
// ctx.rect(160, 10, 100, 40)
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
// ctx.stroke()
// ctx.closePath()