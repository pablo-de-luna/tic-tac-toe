// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

// MOVE THIS FUNCTION INSIDE A FACTORY AS A METHOD
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

  // MAYBE MOVE THIS METHOD TO ANOTHER FACTORY
  const addPlayerMark = (player, row, column) => {
    board[row][column] = player.mark;
  };

  const restartBoard = () => board.forEach(row => row.fill(""));
  
  return {getBoard, addPlayerMark, restartBoard};
})();

// RETHINK RENAMING OR SPLITING THIS FACTORY, PUT EACH METHOD IN A LOGICAL PLACE
const gameControl = (() => {
  // MAYBE CHANGE PLAYERS DECLARATION TO GAMEBOARD OR MAKE IT ACCESIBLE AS A METHOD
  const {player1, player2} = createPlayers("Pablo", "Dutch");
  const board = gameboard.getBoard();
  let currentPlayer = player1;

  //MAYBE THIS METHODS SHOULD BE IN GAMEBOARD
  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  const getCurrentPlayer = () => currentPlayer;
  
  const checkForWinCondition = () => {
    const checkForRowWin = () => {
      return board.some(row => row.every(space => (space === row[0] && space !== "")));
    };

    const checkForColumnWin = () => {
      const columns = [0, 1, 2];
      // This check if SOME column have EVERY row space marked with equal player mark
      return columns.some(col => { 
        return board.every(row => (row[col] === board[0][col] && board[0][col] !== ""))
      });
    };

    const checkForDiagonalWin = () => {
      return (board[1][1] !== "" && (
        (board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
        (board[2][0] === board[1][1] && board[0][2] === board[1][1])
      ));
    };

    return (checkForRowWin() || checkForColumnWin() || checkForDiagonalWin());
  };

  const checkIfSpaceIsTaken = (row, column) => {
    return (board[row][column] !== ""); 
  };

  // REFACTOR AND DO THIS FUNCTION
  const playTurn = (row, column) => {
    gameboard.addPlayerMark(currentPlayer, row, column);

    currentPlayer = (currentPlayer === player1) ? player2 : player1; 
  };
  
  return {
    getCurrentPlayer,
    getPlayer1,
    getPlayer2,
    checkForWinCondition,
    checkIfSpaceIsTaken
  };
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