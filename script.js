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

  const getBoard = () => board;

  return {getBoard, };
})();
