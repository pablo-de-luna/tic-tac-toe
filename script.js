// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const createPlayer = (name, mark) => {
  return {name, mark};
};

const gameboard = (() => {
  const player1 = createPlayer("player1", "O");
  const player2 = createPlayer("player2", "X");
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const getBoard = () => board;
  
  const addPlayerMark = (playerMark, rowNumber, columnNumber) => {
    board[rowNumber][columnNumber] = playerMark.mark;
  }

  return {getBoard, addPlayerMark};
})();

const gameflow = (() => {
  console.table(gameboard.getBoard());
})();
