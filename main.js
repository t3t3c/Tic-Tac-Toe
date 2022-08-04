const Player = (symbol) => {
  return { symbol };
};

const game = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let currentPlayer = playerX;

  return { currentPlayer, playerX, playerO };
})();

const gameBoard = (() => {
  // array storing player choices
  const board = ["", "", "", "", "", "", "", "", ""];
  const fields = document.querySelectorAll(".field");

  const renderBoard = () => {
    fields.forEach((field, index) => {
      field.innerText = board[index];
    });
  };

  const activateFields = (() => {
    fields.forEach((field) => {
      field.addEventListener("click", addMark);
    });
  })();

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    console.log(board);
    renderBoard();
    game.currentPlayer = Player("X");
    display.showCurrent();
  };

  return { board, renderBoard, resetBoard };
})();

const display = (() => {
  const displayDom = document.querySelector("div.display");
  const showWinner = () => {
    displayDom.innerText = `Player ${game.currentPlayer.symbol} has won!`;
  };
  const showDraw = () => {
    displayDom.innerText = `There is a draw!`;
  };
  const showCurrent = () => {
    displayDom.innerText = `Player ${game.currentPlayer.symbol} turn `;
  };
  showCurrent();

  return { showWinner, showDraw, showCurrent };
})();

const changePlayer = () => {
  if (game.currentPlayer.symbol === "X") {
    game.currentPlayer = game.playerO;
  } else {
    game.currentPlayer = game.playerX;
  }
};

function addMark(event) {
  const fieldIndex = Number(event.target.dataset.index);
  if (isFieldMarked(fieldIndex) === false) {
    gameBoard.board[fieldIndex] = game.currentPlayer.symbol;
    console.log(fieldIndex);
    gameBoard.renderBoard();
    if (hasWon(fieldIndex)) {
      display.showWinner();
    } else if (isDraw()) {
      display.showDraw();
    } else {
      changePlayer();
      display.showCurrent();
    }
  }
}

function isFieldMarked(fieldIndex) {
  if (
    gameBoard.board[fieldIndex] === "X" ||
    gameBoard.board[fieldIndex] === "O"
  ) {
    return true;
  } else {
    return false;
  }
}

// winning combinations:
function hasWon() {
  const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical:
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Slanted:
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    // write down the indexes as first, second and third
    const first = winningCombinations[i][0];
    const second = winningCombinations[i][1];
    const third = winningCombinations[i][2];
    // check if all the fields given by the indexes are equal
    // and are not empty
    if (
      gameBoard.board[first] === gameBoard.board[second] &&
      gameBoard.board[first] === gameBoard.board[third] &&
      gameBoard.board[first] != ""
    ) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  return !gameBoard.board.includes("");
}

const restartButton = document.querySelector("button.restart");
restartButton.addEventListener("click", gameBoard.resetBoard);
