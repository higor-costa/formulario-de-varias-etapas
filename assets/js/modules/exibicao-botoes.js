export default function exibicaoBotoes() {
  const botoesBackNext = document.querySelectorAll("[data-navegacao]");
  let secoesArray;

  function addRemoveBotaoBack() {
    const secoes = document.querySelectorAll("[data-secao]");
    secoesArray = Array.from(secoes);
    const botaoBack = botoesBackNext[0];

    setTimeout(() => {
      const secaoContemClasseAtivo = secoesArray.some(verificaSecaoAtiva);

      if (secaoContemClasseAtivo) {
        botaoBack.classList.remove("ativo");
      } else {
        botaoBack.classList.add("ativo");
      }

      addRemoveNextConfirm();
    }, 2);

    function verificaSecaoAtiva(secao) {
      return secao.classList.contains("ativo");
    }
  }

  function addRemoveNextConfirm() {
    const secaoObrigado = secoesArray[1];
    const secaoFinishing = document.querySelector(".secao-finishing");
    const botaoNext = botoesBackNext[1];
    const botaoConfirm = botaoNext.nextElementSibling;

    if (secaoObrigado.classList.contains("ativo")) {
      botaoNext.classList.remove("ativo");
    }

    if (secaoFinishing.classList.contains("ativo")) {
      botaoConfirm.classList.add("ativo");
    } else {
      botaoConfirm.classList.remove("ativo");
    }
  }

  botoesBackNext.forEach((botao) => {
    botao.addEventListener("click", addRemoveBotaoBack);
  });

  window.addEventListener("load", addRemoveBotaoBack);
}