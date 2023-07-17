let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let w, h;
let width = 750;
let height = 750;
let player1 = 'X';
let player2 = 'O';
let currentPlayer;
let playerinfo = -1;
let winner;


function setup() {
  createCanvas(750, 750);
  w = width / 3;
  h = height / 3;
  let totalwidth = windowWidth * 0.47;
  width=totalwidth/3;
  let btn = select('#playagain');
  btn.mousePressed(newGame);
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}
function newGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winner = null;
  document.getElementById("change2").innerHTML ='"AI Vs Human"';
  document.getElementById("change1").innerHTML ='"Human Vs Human"';
  playerinfo=-1;
  loop();
}

function checkWinner() {
  winner = null;
  let pos = [height / 3 / 2, height / 2, height / 1.2];
  // horizontal
  strokeWeight(15);
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
      line(pos[i], 0, pos[i], height);
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
      line(0, pos[i], width*3, pos[i]);
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
    line(0, 0, width*3, height);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
    line(width*3, 0, 0, height);
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  let i = floor(mouseX / width);
  let j = floor(mouseY / width);
  if (board[i][j] == '') {
    if (playerinfo == 2) {
     board[i][j] = currentPlayer;
     currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
    else if (playerinfo == 1) {
      board[i][j] = player2;
      currentPlayer = player1;
      bestMove();
    }
  }

}

function draw() {
  background(0);
  strokeWeight(8);
  stroke(192,192,192);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, w * 3, h);
  line(0, h * 2, w * 3, h * 2);


  for (let i= 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      let r = w / 4;

      if (spot == player2) {
        noFill();
        ellipseMode(CENTER);
        ellipse(x, y, w / 2);
      } else if (spot == player1) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      textAlign(CENTER, CENTER);
      textSize(128);
      fill(0,191,255);
      stroke(25,25,112);
      strokeWeight(6);
      text("T I E !!", width * 3 / 2, height / 2)
    } else {
      textAlign(CENTER, CENTER);
      textSize(128);
      fill(0,191,255);
      stroke(25,25,112);
      strokeWeight(6);
      text(`${result}  wins!!`, width * 3 / 2, height / 2)
    }
  }
}


function bestMove() {
  // player1 to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot player1 available?
      if (board[i][j] == '') {
        board[i][j] = player1;
        let score = minimax(board,0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = player1;
  currentPlayer = player2;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot avplayer1lable?
        if (board[i][j] == '') {
          board[i][j] = player1;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot avplayer1lable?
        if (board[i][j] == '') {
           board[i][j] = player2;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function myfunction(image) {
  var name=[" "," "];
  if(image==1)
  { currentPlayer=player1;
    var i=0;
    while(i<2)
    {name[i]= prompt('Player ' + (i+1) + ': Enter Your Name');
     if (name[i]!= null) {i++;}
     else { alert('Please enter your name!');
     if (name[i]== null) {break;} 
   }
    }
    if ((name[0]!=null)&&(name[1]!=null))
    {document.getElementById("change1").innerHTML =name[0]+' Vs '+name[1];
     playerinfo=2;
    }
   }
  else if(image==2)
    {var name;
    name=prompt('Player 1 is AI\nPlayer 2 : Enter Your Name');
    if (name!=null) {document.getElementById("change2").innerHTML ='AI Vs ' + name;playerinfo=1;}
    else { alert('Please enter your name!'); }
    }

}


function changecolor() {
  color = document.getElementById('color').value;
  document.getElementById('sidebar').style.backgroundColor = color;
}