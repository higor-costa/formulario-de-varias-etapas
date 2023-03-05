export default function validacaoForm() {
  const buttonNext = document.querySelector(".next");
  const form = document.querySelector("form");

  // validação invocada por alterações no formulário ou por clique no botão 'Next Step'
  function validacao(event) {
    // se for chamada por alteração em algum input
    if (event.target.localName === "input") {
      const input = event.target;
      const containerLabel = input.previousElementSibling;
      const mensagemErro = containerLabel.querySelector(".mensagem-error");

      if (!input.checkValidity()) {
        input.classList.add("invalido");
        mensagemErroExibida(input, mensagemErro)
      } else {
        input.classList.remove("invalido");
        mensagemErro.classList.remove("ativo");
      }
    } 
    // se for chamada por clique no botão
    else {
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input, index) => {
        if (!input.checkValidity()) {
          input.classList.add("invalido");
          const indexInput = index;
          const mensagensErro = document.querySelectorAll(".mensagem-error");
          mensagensErro[indexInput].classList.add("ativo"); // exibe a mensagem erro que apresentar index igual ao index do input
        }
      });
    }

    function mensagemErroExibida(input, mensagemErro) {
      const quantidadeCaracteres = input.value.length;
      if (quantidadeCaracteres === 0) {
        mensagemErro.innerText = 'This field is required.';
      } 
      else {
        mensagemErro.innerText = 'Invalid! Please note the example.';
      }
      mensagemErro.classList.add("ativo");
    }
  }

  // apenas letras no input de nome
  function apenasLetras(event) {
    const inputName = event.target.name === "name";
    if (inputName) {
      if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
      }
    }
  }

  // apenas números no input
  function apenasNumeros(event) {
    const inputNumber = event.target.name === "phone";
    if (inputNumber) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        // keyCodes de 65 a 90 se referem as letras de A a Z
        event.preventDefault();
      }
    }
  }

  form.addEventListener("change", validacao);
  form.addEventListener("keydown", apenasLetras);
  form.addEventListener("keydown", apenasNumeros);
  buttonNext.addEventListener("click", validacao);
}