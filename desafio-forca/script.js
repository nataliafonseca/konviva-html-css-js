let ongoingGame = false;
let word = "";
let category = "";
let playedLetters = [];

const wordDiv = document.getElementById("word");

const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
guessButton.addEventListener("click", play);

const categorySpan = document.getElementById("category");
const errorCountSpan = document.getElementById("errors");

async function startGame() {
  if (!ongoingGame || confirm("Tem certeza que deseja iniciar um novo jogo?")) {
    await getWord();
    setWord();
    playedLetters = [];
    ongoingGame = true;
  }
}

async function getWord() {
  const response = await fetch("http://localhost:3000/palavras");
  const words = await response.json();
  wordResponse = words[Math.floor(Math.random() * words.length)];
  word = wordResponse.palavra.toLowerCase();

  const response2 = await fetch(
    `http://localhost:3000/categorias/${wordResponse.categoriaId}`
  );
  category = (await response2.json()).nome;
}

function setWord() {
  wordHtml = "";

  for (const letter of word) {
    if (letter === " ") {
      wordHtml += `<span class="space"></span>`;
    } else {
      wordHtml += `<span></span>`;
    }
  }

  wordDiv.innerHTML = wordHtml;

  categorySpan.innerText = category;

  errorCountSpan.innerText = 0;
}

function play(event) {
  event.preventDefault();

  if (!ongoingGame) {
    if (confirm("Deseja iniciar um novo jogo?")) {
      startGame();
    } else {
      return;
    }
  }

  let guess = guessInput.value.toLowerCase().trim();
  if (!guess) return;

  if (guess.length > 1) {
    if (guess === word) {
      for (const letter of guess) {
        addLetterToWord(letter);
      }
      guessInput.value = "";
      checkComplete();
    } else {
      playedLetters.push(guess);
      addError();
      guessInput.value = "";
    }
  } else if (playedLetters.includes(guess)) {
    alert("Letra repetida");
  } else if (word.includes(guess)) {
    playedLetters.push(guess);
    addLetterToWord(guess);
    guessInput.value = "";
    checkComplete();
  } else {
    playedLetters.push(guess);
    addError();
    guessInput.value = "";
  }
}

function addLetterToWord(letter) {
  for (let index = 0; index < wordDiv.children.length; index++) {
    if (word[index] === letter) {
      wordDiv.children[index].innerText = letter;
    }
  }
}

function addError() {
  errorCountSpan.innerText = ++errorCountSpan.innerText;
  if (parseInt(errorCountSpan.innerText) === 7) {
    setTimeout(() => {
      alert("AAAAAAAAA, você foi enforcado!");
      ongoingGame = false;
    }, 200);
  }
}

function checkComplete() {
  for (const span of wordDiv.children) {
    if (!span.innerText && !span.classList.contains("space")) {
      return false;
    }
  }
  setTimeout(() => {
    alert("Parabéns, você acertou!!!");
    ongoingGame = false;
    return true;
  }, 200);
}
