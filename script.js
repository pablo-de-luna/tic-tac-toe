// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const players = (() => {
  const player1 = {name: "Player 1", mark: "X"};
  const player2 = {name: "Player 2", mark: "0"};

  const setPlayersName = (player1Name = "Player 1", player2Name = "Player 2") => {
    player1.name = player1Name;
    player2.name = player2Name;
  };
  const getPlayers = () => ({player1, player2});

  return {setPlayersName, getPlayers}
})();

const gameboard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const getBoard = () => board;
  const addPlayerMark = (player, row, column) => {board[row][column] = player.mark};
  const restartBoard = () => board.forEach(row => row.fill(""));
  
  return {getBoard, addPlayerMark, restartBoard};
})();

const gameControl = (() => {
  const board = gameboard.getBoard();
  const {player1, player2} = players.getPlayers();
  let currentPlayer = player1;

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

  const checkForDraw = () => {
    return (board.every(row => row.every(space => space !== "")) && !checkForWinCondition());
  };

  const checkIfSpaceIsTaken = (row, column) => {
    return (board[row][column] !== ""); 
  };

  console.table(gameboard.getBoard())
  console.log(`Is ${currentPlayer.name} turn`)

  const playTurn = (row, column) => {
    if (checkIfSpaceIsTaken(row, column)) console.log("Already taken, try again");
    if (checkIfSpaceIsTaken(row, column)) return;

    gameboard.addPlayerMark(currentPlayer, row, column);
    currentPlayer = (currentPlayer === player1) ? player2 : player1; 

    console.table(gameboard.getBoard());

    if (checkForWinCondition()) console.log(`${currentPlayer.name} WON!!!`);
    if (checkForWinCondition()) return;

    if (checkForDraw) console.log("IT'S A DRAW");
    if (checkForDraw) return;

    console.log(`Is ${currentPlayer.name} turn`)
  };
  
  return {
    getCurrentPlayer,
    checkForWinCondition,
    checkForDraw,
    checkIfSpaceIsTaken,
    playTurn,
  };
})();
