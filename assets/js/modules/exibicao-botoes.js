// Função para controlar a exibição dos botões Go Back, Next Step e Confirm
export default function exibicaoBotoes() {
  const botoesBackNext = document.querySelectorAll("[data-navegacao]");
  let secoesArray;

  // Função para adicionar ou remover o botão Go Back
  function addRemoveBotaoBack() {
    const secoes = document.querySelectorAll("[data-secao]");
    secoesArray = Array.from(secoes);
    const botaoBack = botoesBackNext[0];

    // setTimeout é usada para que dê tempo da classe 'ativo' ser adicionada à próxima seção
    setTimeout(() => {
      // secaoContemClasseAtivo recebe um valor booleano referente à função 'verificaSecaoAtiva'
      const secaoContemClasseAtivo = secoesArray.some(verificaSecaoAtiva);

      if (secaoContemClasseAtivo) {
        botaoBack.classList.remove("ativo");
      } else {
        botaoBack.classList.add("ativo");
      }

      addRemoveNextConfirm();
    }, 2);

    // Verifica se a seção Personal Info ou a seção de Thank You está ativa
    function verificaSecaoAtiva(secao) {
      return secao.classList.contains("ativo");
    }
  }

  // Função para adicionar ou remover os botões Go Back e Confirm
  function addRemoveNextConfirm() {
    const secaoObrigado = secoesArray[1];
    const secaoFinishing = document.querySelector(".secao-finishing");
    const botaoNext = botoesBackNext[1];
    const botaoConfirm = botaoNext.nextElementSibling;

    if (secaoObrigado.classList.contains("ativo") || secaoFinishing.classList.contains("ativo")) {
      botaoNext.classList.remove("ativo");
    } else {
      botaoNext.classList.add("ativo");
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

  // Para remover o botão Go Back assim que a página for carregada
  window.addEventListener("load", addRemoveBotaoBack); 
}