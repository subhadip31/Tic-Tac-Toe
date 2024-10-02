let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");

let winningBlock = getComputedStyle(document.body).getPropertyValue(
  "--winBlockColor"
);

let boxes = Array.from(document.getElementsByClassName("box"));

const O_text = "O";
const X_text = "X";

let currentPlayer = X_text;
let spaces = [null, null, null, null, null, null, null, null, null];

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has Won!!!`;
      let winning_Blocks = playerHasWon();
      winning_Blocks.map(
        (box) => (boxes[box].style.backgroundColor = winningBlock)
      );

      boxes.forEach((box) => box.removeEventListener("click", boxClicked));

      return;
    }

    currentPlayer = currentPlayer == X_text ? O_text : X_text;
  }
} 

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const chance of winningCombos) {
    let [a, b, c] = chance;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText.innerHTML = "Tic Tac Toe";
  currentPlayer = X_text;
  startGame();
}

startGame();
