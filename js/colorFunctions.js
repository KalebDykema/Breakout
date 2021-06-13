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
  if(xColor.toLowerCase() == 'r' && yColor.toLowerCase != 'r') red = ball.x + defaultValue
  else if(xColor.toLowerCase() == 'g' && yColor.toLowerCase != 'g') green = ball.x + defaultValue
  else if(xColor.toLowerCase() == 'b' && yColor.toLowerCase != 'b') blue = ball.x + defaultValue
  else return ball.color

  // Checks what color the second variable is, makes sure the first is not the same, and makes sure it's R, G, or B. If none of this is true, returns the default color
  if(yColor.toLowerCase() == 'r' && xColor.toLowerCase != 'r') red = ball.y + defaultValue
  else if(yColor.toLowerCase() == 'g' && xColor.toLowerCase != 'g') green = ball.y + defaultValue
  else if(yColor.toLowerCase() == 'b' && xColor.toLowerCase != 'b') blue = ball.y + defaultValue
  else return ball.color

  return `rgb(${red}, ${green}, ${blue})`
}