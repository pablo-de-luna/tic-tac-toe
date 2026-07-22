// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const players = (() => {
  const player1 = {name: "Player 1", mark: "X"};
  const player2 = {name: "Player 2", mark: "0"};

  const setPlayersName = (player1Name, player2Name) => {
    if (!player1Name) player1Name = "Player 1"
    if (!player2Name) player2Name = "Player 2"

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
  let gameoverStatus = false;

  const getCurrentPlayer = () => currentPlayer;
  const getLastPlayer = () => (currentPlayer === player1) ? player2 : player1;

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

  const handleGameoverStatus = () => {
    if (checkForDraw() || checkForWinCondition()) {
      gameoverStatus = true;
    };
    return gameoverStatus;
  };
  const getGameoverStatus = () => gameoverStatus;
  const setGameoverStatus = (status) => gameoverStatus = status;

  // const playTurn = (row, column) => {
  //   gameboard.addPlayerMark(currentPlayer, row, column);
  //   handleGameoverStatus();
  //   togglePlayer();
  // };
  
  // LOG GAME IN THE CONSOLE
  console.table(gameboard.getBoard())
  console.log(`Is ${currentPlayer.name} turn`)
  const playTurn = (row, column) => {
    if (checkIfSpaceIsTaken(row, column)) console.log("Already taken, try again");
    if (checkIfSpaceIsTaken(row, column)) return;
    gameboard.addPlayerMark(currentPlayer, row, column);
    console.table(gameboard.getBoard());
    if (checkForWinCondition()) console.log(`${currentPlayer.name} WINS`);
    if (checkForDraw()) console.log("IT'S A DRAW");
    togglePlayer();
    console.log(`Is ${currentPlayer.name} turn`)
    console.log("GAMEOVER = " + handleGameoverStatus())
  };
  
  return {
    getCurrentPlayer,
    getLastPlayer,
    checkForWinCondition,
    checkForDraw,
    checkIfSpaceIsTaken,
    getGameoverStatus,
    playTurn,
  };
})();

const displayControl = (() => {
  const menuDisplay = document.querySelector("#setup-game-section");
  const gameboardDisplay = document.querySelector("#gameboard-section");
  const gameInfoDisplay = document.querySelector("#game-info")
  const turnInfoDisplay = document.querySelector("#turn-info");
  const spaces = document.querySelectorAll(".board-space");
  const spacesCoords = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ];

  const asignDataCoords = () => {
    for (let i = 0; i < spaces.length; i++) {
      spaces[i].dataset.coords = spacesCoords[i];
    };
  }
  asignDataCoords();

  const showFirstPlayerInTurnInfo = () => {
    turnInfoDisplay.textContent = `It's ${gameControl.getCurrentPlayer().name} turn`;
  };

  const handleMenu = () => {
    const player1NameInput = document.querySelector("#player1-name");
    const player2NameInput = document.querySelector("#player2-name");
    const playButton = document.querySelector("#play-button");

    // this prevent user write symbols or weird characters 
    player1NameInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    });

    playButton.addEventListener("click", ()=> {
      players.setPlayersName(player1NameInput.value, player2NameInput.value);
      menuDisplay.className = "hidden";
      gameboardDisplay.className = "visible";
      gameInfoDisplay.className = "visible";
      showFirstPlayerInTurnInfo();
    });
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

      if (gameControl.getGameoverStatus()) {
        return;
      } else if (!gameControl.checkIfSpaceIsTaken(row, column)) {
        handleMarkDisplayInSpace(space);
      } else {
        turnInfoDisplay.textContent = "ALREADY TAKEN, TRY AGAIN";
        return;
      }

      gameControl.playTurn(row, column);

      if (gameControl.checkForWinCondition()) {
        turnInfoDisplay.textContent = `${gameControl.getLastPlayer().name} wins!`;
        return;
      }
      if (gameControl.checkForDraw()) {
        turnInfoDisplay.textContent = "It's a Draw";
        return;
      }

      turnInfoDisplay.textContent = `It's ${gameControl.getCurrentPlayer().name} turn`
    }));
  };

  return {handleSpaceClickEvent, handleMenu, };
})();

const initializeGame = (() => {
  displayControl.handleMenu();
  // UPDATE NAMES IN PLAYERS INFO
  // ADD RESET BUTTON FOR WHEN GAME IS OVER
  // ADD A GO TO MENU BUTTON
  displayControl.handleSpaceClickEvent();
})();