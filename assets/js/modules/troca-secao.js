export default function trocaSecao() {
  let secaoIndex = 1;
  troca(secaoIndex);

  // função invocada pelos botões, além disso recebe o index deles. O botão Go Back tem index = 0, já os outros dois botões tem index = 1
  function avancarVoltar(indexBotao) {
    troca(secaoIndex += indexBotao);
  }

  function troca(index) {
    const steps = document.querySelectorAll("[data-step]");
    const sections = document.querySelectorAll("section");

    steps.forEach((step) => {
      step.classList.remove("ativo"); // remove a classe 'ativo' de todos os steps
    });

    sections.forEach((section) => {
      section.classList.remove("ativo"); // remove a classe 'ativo' de todas as seções
    });

    if (index < 5) {
      steps[index - 1].classList.add("ativo"); // adiciona a classe 'ativo' ao step relacionado à determinada seção
    }

    sections[index - 1].classList.add("ativo"); // adiciona a classe 'ativo' à seção que deve ser exibida
  }

  const botoes = document.querySelectorAll("[data-navegacao]");
  botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const indexBotao = index;
      if (indexBotao === 0) {
        avancarVoltar(-1);
      } else {
        avancarVoltar(1);
      }
    });
  });
}