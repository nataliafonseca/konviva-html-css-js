function linguagem() {
  var a;
  let b;
  const c = 5;

  // Valores, tipos e operadores
  let numero = 0;
  let boleano = true;
  let texto = "";
  let data = new Date(); //data de hoje

  typeof numero;
  typeof boleano;
  typeof texto;
  typeof data;

  numero == "0"; //true
  numero === 0; //true
  !boleano; //false
  data > new Date(2020, 01, 01); //true

  // null e undefined
  let indefinido;
  let nulo = null;

  typeof indefinido; //undefined
  typeof nulo; // object

  //Arrays e Objetos
  let lista = [];
  let objeto = {};

  //laços e blocos de execução
  for (let i = 0; i < lista.length; i++) {
    console.log(lista[i]);
  }

  for (const valor of lista) {
    console.log(valor);
  }

  while (false) {}

  do {} while (false);

  lista.forEach((valor) => {
    console.log(valor);
  });

  // unica linha
  if (lista) console.log("array");
  else console.log("objeto");

  // bloco
  if (objeto) {
    console.log("objeto");
  } else {
    console.log("vazio");
  }

  // switch case
  let x = 1;
  switch (x) {
    case 1:
      console.log("1");
      break;
    default:
      console.log("desconhecido");
  }

  //ternário
  true ? "verdadeiro" : "falso";
}

const funcao = function () {
  linguagem();
};

const funcao2 = () => {
  funcao();
};

/**
 * Executa o submit do formulário da página
 * @param {Event} event Evento de submit
 */
const onSubmit = (event) => {
  event.preventDefault();
  const ulEl = document.querySelector(".main ul");

  if (ulEl) {
    const submitedValue = {
      nome: event.target.nome.value,
      tipo: event.target.tipo.value,
    };

    // Trabalhando com promises sem uso do async/await
    postData(novoId, submitedValue).then((novaSubmissao) => {
      novoId++;
      addListItem(novaSubmissao, ulEl);
    });
  }
};

/**
 * Consulta dados na API
 * @returns {Promise<{ tipo: number; nome: string }[]>} Lista de submissões
 */
const getData = () =>
  fetch("http://localhost:3000/submissoes")
    .then((response) => response.json())
    .catch((err) => console.error(err));

/**
 * Envia dados para API
 * @param {{ tipo: number; nome: string }} novaSubmissao
 * @returns {Promise<{ tipo: number; nome: string }>} Nova submissão
 */
const postData = (novaSubmissao) =>
  fetch(`http://localhost:3000/submissoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaSubmissao),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));

/**
 * Adiciona item na lista do html
 * @param {{ tipo: number; nome: string }} item
 * @param {HTMLUListElement} ulEl
 */
const addListItem = (item, ulEl) => {
  const liEl = document.createElement("li");
  liEl.innerText = `${item.nome} - Tipo: ${item.tipo}`;
  ulEl.appendChild(liEl);
};

/**
 * Adiciona lista de submits consultada
 * @param {HTMLUListElement} ulEl
 */
const addSubmits = async (ulEl) => {
  // Trabalhando com promises usando async/await
  const result = await getData();

  // Se result existir e tiver elementos no array
  if (result && result.length) {
    result.forEach((item) => addListItem(item, ulEl));
  }
};

/**
 * executa após carregamento do conteúdo do DOM
 */
const onLoad = () => {
  const footerEl = document.querySelector(".footer p");
  const formEl = document.querySelector("form");
  const ulEl = document.querySelector(".submits ul");
  // verifica o elemento buscado
  if (footerEl) footerEl.innerHTML += ` - ${new Date().getFullYear()}`;
  // verifica o elemento buscado
  if (formEl) formEl.addEventListener("submit", onSubmit);
  // verifica o elemento buscado
  if (ulEl) addSubmits(ulEl);
  // remove evento do documento
  document.removeEventListener("DOMContentLoaded", onLoad);
};
// adiciona evento no documento
document.addEventListener("DOMContentLoaded", onLoad);
