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

  const form = document.querySelector('form');
  const botoes = document.querySelectorAll("[data-navegacao]");
  botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const indexBotao = index;
      if (indexBotao === 0) {
        avancarVoltar(-1);
      } else if(form.checkValidity()){
          avancarVoltar(1);
      }
    });
  });

  function habilitaDesabilitaBotao() {
      const secao = document.querySelector('.your-plan');
      const cardsPlanos = document.querySelectorAll('.container-plano');
      const cardsArray = Array.from(cardsPlanos);
      const cardEscolhido = cardsArray.some(verificaCardEscolhido);
      const botaoNext = botoes[1];
      const secaoForm = document.querySelector('[data-secao]');

      // verifica se algum plano foi escolhido pelo usuário e retorna true ou false
      function verificaCardEscolhido(card) {
        return card.classList.contains('escolhido');
      }

      // Desabilita botão 'Next Step' assim que o usuário entra na seção de escolha de planos
      if(!cardEscolhido && secao.classList.contains('ativo')) {
        botaoNext.disabled = true;
      }

      // O botão será habilitado novamente apenas se um plano for escolhido
      // const cardsPlanos = document.querySelectorAll('.container-plano')
      cardsPlanos.forEach(card => {
        card.addEventListener('click', () => {
          botaoNext.disabled = false;
        });
      })

      if(secaoForm.classList.contains("ativo")) {
        botaoNext.disabled = false;
      }
  }

  botoes.forEach(b => {
    b.addEventListener('click', habilitaDesabilitaBotao);
  })
  
  // Esconde seção Finishing Up e exibe seção Your Plan
  function changePlano() {
    avancarVoltar(-2); // -2 como argumento para poder voltar à seção Your Plan
    const botaoConfirm = document.querySelector('.confirm');
    botaoConfirm.classList.remove('ativo');
  }
  const botaoChange = document.querySelector('.botao-alterar-plano');
  botaoChange.addEventListener('click', changePlano);
}