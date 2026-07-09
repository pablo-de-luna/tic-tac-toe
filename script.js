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
    ["X", "X", ""],
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
    const checkIfSpaceIsTaken = () => {
      return (board[row][column] !== ""); 
    };

    if (checkIfSpaceIsTaken()) {
      console.log("Already taken, try other");
      return;
    };
    
    gameboard.addPlayerMark(currentPlayer, row, column);

    currentPlayer = (currentPlayer === player1) ? player2 : player1; 

    console.table(gameboard.getBoard());

    const checkForHorizontalWin = () => {
      return board.some(row => {
        row[0] !== "" && row.every(space => space === row[0])
      });
    };

    const checkForVerticalWin = () => {
      const columns = [0, 1, 2];
      // Check if SOME column have EVERY row space marked with equal player mark
      return columns.some(col => {
        board[0][col] !== "" && board.every(row => row[col] === board[0][col])
      });
    };

    const checkForDiagonalWin = () => {
      // middle must be filled and equal to both ends of a diagonal
      return (board[1][1] !== "" && (
        (board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
        (board[2][0] === board[1][1] && board[0][2] === board[1][1])
      ));
    };

    if (checkForHorizontalWin() || checkForVerticalWin() || checkForDiagonalWin()) {
      console.log("SOMEONE WON");
      return;
    }

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