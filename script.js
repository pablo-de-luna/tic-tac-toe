// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const createPlayer = (name, team) => {
  return {name, team};
};

const gameboard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const player1 = createPlayer("player1", "O");
  const player2 = createPlayer("player2", "X");

  const getBoard = () => board;

  return {getBoard, };
})();
