// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const createPlayers = (player1Name = "player1", player2Name = "player2") => {
  return {
    player1: {
      name: player1Name,
      mark: "x",
    },
    player2: {
      name: player2Name,
      mark: "o",
    }
  };
};

const gameboard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const getBoard = () => board;
  
  const addPlayerMark = (player, row, column) => {
    board[row][column] = player.mark;
  }

  return {getBoard, addPlayerMark};
})();

const gameflow = (() => {
  console.table(gameboard.getBoard());
})();
