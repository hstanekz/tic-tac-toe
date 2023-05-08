const Gameboard = (() => {
    const board = new Array(9).fill(null);
  
    const getBoard = () => board;
  
    const makeMove = (index, player) => {
      if (board[index] === null) {
        board[index] = player;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      board.fill(null);
    };
  
    return { getBoard, makeMove, resetBoard };
  })();
  
  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
  
    return { getName, getMarker };
  };
  
  const Game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let isGameOver = false;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const handleBoxClick = (event) => {
      const box = event.target;
      const index = Number(box.dataset.index);
  
      if (isGameOver || !Gameboard.makeMove(index, currentPlayer.getMarker())) {
        return;
      }
  
      box.textContent = currentPlayer.getMarker();
  
      if (checkForWinner()) {
        endGame(`${currentPlayer.getName()} wins!`);
        return;
      }
  
      if (isBoardFull()) {
        endGame("It's a tie!");
        return;
      }
  
      switchPlayer();
    };
  
    const checkForWinner = () => {
      const board = Gameboard.getBoard();
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
      return false;
    };
  
    const isBoardFull = () => {
      const board = Gameboard.getBoard();
      return board.every((square) => square !== null);
    };
  
    const endGame = (message) => {
      isGameOver = true;
      const winnerDisplay = document.querySelector('.winner-display');
      winnerDisplay.textContent = message;
      winnerDisplay.classList.add('show');
    };
  
    const init = () => {
      const boxes = document.querySelectorAll('.box');
      boxes.forEach((box, index) => {
        box.addEventListener('click', handleBoxClick);
        box.dataset.index = index;
      });
    };
  
    const resetGame = () => {
      Gameboard.resetBoard();
      isGameOver = false;
      currentPlayer = player1;
      const boxes = document.querySelectorAll('.box');
      boxes.forEach((box) => {
        box.textContent = '';
      });
      const winnerDisplay = document.querySelector('.winner-display');
      winnerDisplay.classList.remove('show');
    };
  
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', resetGame);
  
    return { init };
  })();
  
  Game.init();
  