let ongoingGame = false;
let word = "";
let category = "";
let playedLetters = [];

const wordDiv = document.getElementById("word");

const guessInput = document.getElementById("guess-input");
const guessForm = document.getElementById("guess-form");
guessForm.addEventListener("submit", play);

const categorySpan = document.getElementById("category");
const errorCountSpan = document.getElementById("errors");

async function startGame() {
  if (!ongoingGame || confirm("Tem certeza que deseja iniciar um novo jogo?")) {
    await getWord();
    setWord();
    playedLetters = [];
    ongoingGame = true;
    bonequinho = document.getElementById("bonequinho");
    for (const bodyPart of bonequinho.children) {
      bodyPart.classList.add("invisible");
    }
  }
}

async function getWord() {
  const response = await fetch(
    "https://my-json-server.typicode.com/nataliafonseca/konviva-html-css-js/palavras?_expand=categoria"
  );
  const words = await response.json();
  wordResponse = words[Math.floor(Math.random() * words.length)];
  word = wordResponse.palavra.toLowerCase();
  category = wordResponse.categoria.nome;
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

async function play(event) {
  event.preventDefault();

  if (!ongoingGame) {
    if (confirm("Deseja iniciar um novo jogo?")) {
      await startGame();
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
  if (parseInt(errorCountSpan.innerText) === 1)
    document.getElementById("head").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 2)
    document.getElementById("body").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 3)
    document.getElementById("left-arm").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 4)
    document.getElementById("right-arm").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 5)
    document.getElementById("left-leg").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 6)
    document.getElementById("right-leg").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 7)
    document.getElementById("eyes").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 8)
    document.getElementById("nose").classList.remove("invisible");
  if (parseInt(errorCountSpan.innerText) === 9) {
    document.getElementById("mouth").classList.remove("invisible");
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
