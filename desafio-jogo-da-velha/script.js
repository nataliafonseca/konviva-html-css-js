const game = document.querySelector(".game");
for (const button of game.children) {
  button.addEventListener("click", onPlay);
}

let player = "X";
let winner = null;

function togglePlayer() {
  if (player === "X") player = "O";
  else player = "X";
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
    checkTie() ||
    checkWinner(0, 1, 2) ||
    checkWinner(3, 4, 5) ||
    checkWinner(6, 7, 8) ||
    checkWinner(0, 3, 6) ||
    checkWinner(1, 4, 7) ||
    checkWinner(2, 5, 8) ||
    checkWinner(0, 4, 8) ||
    checkWinner(2, 4, 6)
  ) {
    for (const button of game.children) button.disabled = true;

    const result = document.querySelector(".result");

    if (winner) result.innerHTML = `Jogador ${winner} venceu!`;
    else result.innerHTML = `O jogo empatou!`;
  }
}
