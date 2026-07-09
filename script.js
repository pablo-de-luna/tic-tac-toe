// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const createPlayers = (player1Name = "player1", player2Name = "player2") => {
  return {
    player1: {
      name: player1Name,
      mark: "X",
    },
    player2: {
      name: player2Name,
      mark: "0",
    }
  };
};

const gameboard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const getBoard = () => board;
  const addPlayerMark = (player, row, column) => {
    board[row][column] = player.mark;
  };
  const restartBoard = () => board.forEach(row => row.fill(""));

  return {getBoard, addPlayerMark, restartBoard};
})();

const gameControl = (() => {
  const {player1, player2} = createPlayers("Pablo", "Dutch");
  const board = gameboard.getBoard();
  let currentPlayer = player1;

  console.table(gameboard.getBoard());
  console.log(`${currentPlayer.name} turn!`);

  const playTurn = (row, column) => {

    if (board[row][column] !== "") {
      console.log("Already taken, try other");
      return;
    };

    gameboard.addPlayerMark(currentPlayer, row, column);
    currentPlayer = (currentPlayer === player1) ? player2 : player1; 

    console.table(gameboard.getBoard());

    const checkForHorizontalWin = () => {
      board.forEach(row => {
        if (row.every(space => (space === row[0] && space !== ""))) {
          console.log("WIN");
        }
      });
    };
    checkForHorizontalWin();

    console.log(`${currentPlayer.name} turn!`);
  };
  
  return {playTurn};
})();

//POSSIBLE WINNING COMBINATIONS
// 111,000,000 
// 000,111,000 HORIZONTAL 
// 000,000,111 

// 100,100,100 
// 010,010,010 VERTICAL
// 001,001,001 

// 100,010,001 DIAGONAL
// 001,010,100 

// SPACE NUMBER INSTEAD OF ROW/COLUMN COORDS
// 012 
// 345 HORIZONTAL
// 678

// 036
// 147 VERTICAL
// 258

// 048 DIAGONAL
// 245
