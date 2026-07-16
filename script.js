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
  
  const togglePlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1; 
  };

  const checkForWinCondition = () => {
    const checkForRowWin = () => {
      return board.some(row => row.every(space => (space === row[0] && space !== "")));
    };
    const checkForColumnWin = () => {
      const columns = [0, 1, 2];
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

    console.table(gameboard.getBoard());

    if (checkForWinCondition()) console.log(`${currentPlayer.name} WINS!!!`);
    if (checkForWinCondition()) return;

    if (checkForDraw()) console.log("IT'S A DRAW");
    if (checkForDraw()) return;

    togglePlayer();
    console.log(`Is ${currentPlayer.name} turn`)
  };
  
  return {
    getCurrentPlayer,
    togglePlayer,
    checkForWinCondition,
    checkForDraw,
    checkIfSpaceIsTaken,
    playTurn,
  };
})();

const displayControl = (() => {
  const spaces = document.querySelectorAll(".board-space");
  const turnInfo = document.querySelector("#turn-info");
  const spacesCoords = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ]

  for (let i = 0; i < spaces.length; i++) {
    spaces[i].dataset.coords = spacesCoords[i];
  };

  const handleMarkDisplayInSpace = (space) => {
    const currentPlayer = gameControl.getCurrentPlayer();

    if (currentPlayer.mark === "X") {
      const xMarkImg = document.createElement("img");
      xMarkImg.src = "./assets/images/x-mark.png";
      space.appendChild(xMarkImg);
    } else {
      const oMarkImg = document.createElement("img");
      oMarkImg.src = "./assets/images/o-mark.png";
      space.appendChild(oMarkImg);
    };
  };
  
  const handleSpaceClickEvent = () => {
    spaces.forEach(space => space.addEventListener("click", () => {
      const [row, column] = space.dataset.coords.split(",")
      const currentPlayerName = gameControl.getCurrentPlayer().name;

      if (!gameControl.checkIfSpaceIsTaken(row, column)) {
        handleMarkDisplayInSpace(space);
      } else {
        turnInfo.textContent = "ALREADY TAKEN, TRY AGAIN";
        return;
      }

      gameControl.playTurn(row, column);

      if (gameControl.checkForWinCondition()) {
        turnInfo.textContent = `${currentPlayerName} wins!`;
        return;
      }
      if (gameControl.checkForDraw()) {
        turnInfo.textContent = "It's a Draw";
        return;
      }

      turnInfo.textContent = `It's ${currentPlayerName} turn`
    }));
  };

  return {handleSpaceClickEvent}
})();

const initializeGame = (() => {
  displayControl.handleSpaceClickEvent();
})();