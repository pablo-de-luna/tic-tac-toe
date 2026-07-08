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

const gameflow = (() => {
  const {player1, player2} = createPlayers("Pablo", "Dutch");

  gameboard.addPlayerMark(player1, 1, 2);

  console.table(gameboard.getBoard());

  //player 1 turn
  //switch to next
  //player 2 turn
  //loop that until winning condition
})();
