const categoryForm = document.getElementById("category-form");
categoryForm.addEventListener("submit", registerCategory);
const newCategoryInput = document.getElementById("new-category");

window.addEventListener("load", onLoad);
const wordForm = document.getElementById("word-form");
wordForm.addEventListener("submit", registerWord);

const categorySelect = document.getElementById("category-select");
const newWordInput = document.getElementById("new-word");

async function onLoad() {
  const response = await fetch("http://localhost:3000/categorias");
  const categories = await response.json();

  let options = ``;

  for (const category of categories) {
    options += `<option value=${category.id}>${category.nome}</option>`;
  }

  categorySelect.innerHTML = options;
}

async function registerCategory(event) {
  event.preventDefault();

  await fetch("http://localhost:3000/categorias", {
    method: "POST",
    body: JSON.stringify({
      nome: newCategoryInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function registerWord(event) {
  event.preventDefault();

  await fetch("http://localhost:3000/palavras", {
    method: "POST",
    body: JSON.stringify({
      palavra: newWordInput.value,
      categoriaId: categorySelect.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
