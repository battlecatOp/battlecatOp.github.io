
var playerOne = " "
var playerTwo = " "
var colorOne = "#000000"
var colorOneTint = "#000000"
var colorTwo = "#000000"
var colorTwoTint = "#000000"

var currentPlayerName = " "
var currentPlayer = 1
var currentColor = " "
var currentColorTint = " "

var board = new Array(6)
for (var i = 0; i < 6; i++) {
  board[i] = new Array(7)
}


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function colorTintShade(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16)
  var g = parseInt(result[2], 16)
  var b = parseInt(result[3],16)
  if (r > 160 || g > 170 || b > 170){
    r =  Math.floor(r*0.5)
    g =  Math.floor(g*0.5)
    b =  Math.floor(b*0.5)
  }else{
    r =  Math.floor(r*1.5)
    g =  Math.floor(r*1.5)
    b =  Math.floor(r*1.5)
  }


  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

}

// START THE GAME
$('#startBtn').on("click",function(){
  if($('#playerOne').val() == ""){
    playerOne = $('#playerOne').attr('placeholder')
  }else{
    playerOne = $('#playerOne').val()
  }
  if($('#playerTwo').val() == ""){
    playerTwo = $('#playerTwo').attr('placeholder')
  }else{
    playerTwo = $('#playerTwo').val()
  }

  colorOne = $('#colorOne').val()
  colorOneTint = colorTintShade(colorOne)
  colorTwo = $('#colorTwo').val()
  colorTwoTint = colorTintShade(colorTwo)


  currentPlayerName = playerOne
  currentPlayer = 1
  currentColor = colorOne
  currentColorTint = colorOneTint

  //update whose turn it is
  $('#turn').text(currentPlayerName+"! It is your turn!" )

  //start the Game
  $('#board button').css("pointer-events","auto")

  // RESET THE BOARD
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',"white")
    }
  }

  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      board[row][col] = 0
    }
  }

  $('#startupJMB').fadeOut(600)
  setTimeout(() => { $('#playingField').fadeIn(600) }, 700);
})


// RESTART THE Game
$('#restartBtn').on('click',function(){
  $('#playingField').fadeOut(600)
  setTimeout(() => { $('#startupJMB').fadeIn(600) }, 700);

})



// Mouse Over effect for the board
$('#board button').on('mouseover',function(){
  // board[$(this).closest("tr").index()][$(this).closest("td").index()] = 1
  let row = $(this).closest("tr").index()
  let col = $(this).closest("td").index()
  let row_pos = findValidRowForCol(col)
  if (row_pos !== -1) {

    $('#board').find('tr').eq(row_pos).find('td').eq(col).find('button').css('background-color',currentColorTint)
  }else {

  }

})

// Mouse Over effect for the board
$('#board button').on('mouseout',function(){
  // board[$(this).closest("tr").index()][$(this).closest("td").index()] = 1
  let row = $(this).closest("tr").index()
  let col = $(this).closest("td").index()
  let row_pos = findValidRowForCol(col)
  if (row_pos !== -1) {
    $('#board').find('tr').eq(row_pos).find('td').eq(col).find('button').css('background-color', 'white')
  }else {

  }

})

// Click logic for the buttons to place discs
$('#board button').on('click',function(){
  // console.log("clicked me");
  // console.log($(this).closest("td").index());
  // console.log($(this).closest("tr").index());
  // board[$(this).closest("tr").index()][$(this).closest("td").index()] = 1
  let row = $(this).closest("tr").index()
  let col = $(this).closest("td").index()
  let row_pos = findValidRowForCol(col)
  if (row_pos !== -1) {
    board[row_pos][col] = currentPlayer;
    $('#board').find('tr').eq(row_pos).find('td').eq(col).find('button').css('background-color',currentColor)
  }else {
    return
  }
  //checkForWin
  if (checkForWin()) {
    return
  }
  if (currentPlayer === 1) {
    currentPlayer = 2
    currentColor = colorTwo
    currentColorTint = colorTwoTint
    currentPlayerName = playerTwo
  }else {
    currentPlayer = 1
    currentColor = colorOne
    currentColorTint = colorOneTint
    currentPlayerName = playerOne
  }
  $('#turn').text(currentPlayerName+"! It is your turn!" )


})

function winEffect(row, col){
  $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColorTint)
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColor) }, 500);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColorTint) }, 1000);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColor) }, 1500);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColorTint) }, 2000);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColor) }, 2500);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColorTint) }, 3000);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColor) }, 3500);
  setTimeout(() => { $('#board').find('tr').eq(row).find('td').eq(col).find('button').css('background-color',currentColorTint) }, 4000);
}


function checkForHorizontal() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(board[row][col] != 0 &&
      board[row][col] == board[row][col+1] &&
      board[row][col] == board[row][col+2] &&
      board[row][col] == board[row][col+3]){
        winEffect(row,col)
        winEffect(row,col+1)
        winEffect(row,col+2)
        winEffect(row,col+3)
        return true
      }
    }
  }
  return false
}

function checkForVertical() {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 7; col++) {
      if(board[row][col] != 0 &&
      board[row][col] == board[row+1][col] &&
      board[row][col] == board[row+2][col] &&
      board[row][col] == board[row+3][col]){
        winEffect(row,col)
        winEffect(row+1,col)
        winEffect(row+2,col)
        winEffect(row+3,col)
        return true
      }
    }
  }
  return false
}

function checkForDiagonal(){
  //left to right upwards diagonal
  for (var row = 3; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(board[row][col] != 0 &&
      board[row][col] == board[row-1][col+1] &&
      board[row][col] == board[row-2][col+2] &&
      board[row][col] == board[row-3][col+3]){
        winEffect(row,col)
        winEffect(row-1,col+1)
        winEffect(row-2,col+2)
        winEffect(row-3,col+3)
        return true
      }
    }
  }
  // left to right downwards diagonal
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 4; col++) {
      if(board[row][col] != 0 &&
      board[row][col] == board[row+1][col+1] &&
      board[row][col] == board[row+2][col+2] &&
      board[row][col] == board[row+3][col+3]){
        winEffect(row,col)
        winEffect(row+1,col+1)
        winEffect(row+2,col+2)
        winEffect(row+3,col+3)
        return true
      }
    }
  }
  return false
}




function checkForWin() {

  if(checkForHorizontal() || checkForVertical() || checkForDiagonal()){
    console.log("WINWINWIN");
    $('#turn').text("Congratulations! "+currentPlayerName+" is the winner! If you want to play again, restart the game!" )
    $('#board button').css("pointer-events","none")
    return true
  }else{
    return false
  }
}





function findValidRowForCol(col) {
  for (var i = 5; i >= 0; i--) {
    if (board[i][col] === 0) {
      return i
    }
  }
  return -1
}

// access a cell in table
// ('#board').find('tr').eq(2).find('td').eq(3).find('button').css('background-color','red')
