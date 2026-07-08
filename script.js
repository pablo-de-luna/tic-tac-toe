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

  const restartBoard = () => {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        board[i][j] = "";
      }
    }
  };

  return {getBoard, restartBoard};
})();

const gameflow = (() => {
  console.table(gameboard.getBoard());

  //player 1 turn
  //switch to next
  //player 2 turn
  //loop that until winning condition
})();
