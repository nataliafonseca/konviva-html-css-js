window.addEventListener("load", startGame);
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", startGame);

const game = document.querySelector(".game");
const result = document.querySelector(".result");

let player;
let winner;
let winningCases;

function startGame() {
  player = "X";
  winner = null;
  winningCases = [];
  result.innerText = `Vez do jogador ${player}`;

  for (const button of game.children) {
    button.removeAttribute("class");
    button.removeAttribute("data-value");
    button.removeAttribute("disabled");
    button.addEventListener("click", onPlay);
  }
}

function togglePlayer() {
  if (player === "X") player = "O";
  else player = "X";
  result.innerText = `Vez do jogador ${player}`;
}

function onPlay(event) {
  if (!!event.srcElement.dataset.value) return;

  event.srcElement.dataset.value = `${player}`;
  event.srcElement.classList.add(`player${player}`);
  togglePlayer();
  checkResult();
}

function checkWinner(button1, button2, button3) {
  if (
    game.children[button1].dataset.value &&
    game.children[button2].dataset.value &&
    game.children[button3].dataset.value &&
    game.children[button1].dataset.value ===
      game.children[button2].dataset.value &&
    game.children[button1].dataset.value ===
      game.children[button3].dataset.value
  ) {
    winningCases = [
      game.children[button1],
      game.children[button2],
      game.children[button3],
    ];
    winner = game.children[button1].dataset.value;
    return true;
  }
  return false;
}

function checkTie() {
  for (const button of game.children) {
    if (!button.dataset.value) return false;
  }
  return true;
}

function checkResult() {
  if (
    checkWinner(0, 1, 2) ||
    checkWinner(3, 4, 5) ||
    checkWinner(6, 7, 8) ||
    checkWinner(0, 3, 6) ||
    checkWinner(1, 4, 7) ||
    checkWinner(2, 5, 8) ||
    checkWinner(0, 4, 8) ||
    checkWinner(2, 4, 6) ||
    checkTie()
  ) {
    for (const button of game.children) button.disabled = true;
    for (const button of winningCases) button.classList.add("win");

    if (winner) result.innerText = `Jogador ${winner} venceu!`;
    else result.innerText = `Deu velha!`;
  }
}
