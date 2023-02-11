export default function verificacaoConfirmacao() {
  const arrayCards = document.querySelectorAll(".container-plano");
  const inputsCheckbox = document.querySelectorAll("[data-input-checkbox]");
  const botaoSwitch = document.querySelector('[type="checkbox"]');
  const servicosEscolhidos = document.querySelector(".servicos-escolhidos");
  let cardEscolhido;
  let htmlValor;
  let div;

  // Função para verificar se a função foi invocada por um clique no card ou no checkbox
  function verificaOrigemChamada() {
    const cards = document.querySelectorAll(".container-plano");

    if (this.type === "checkbox") {
      // iteração por todos os cards para saber qual foi o escolhido pelo usuário
      cards.forEach((card) => {
        if (card.classList.contains("escolhido")) {
          pegaValor(card); // o card escolhido será passado como argumento
        }
      });
    } else {
      // caso tenha sido invocada por clique em algum dos cards, o this será o próprio elemento que foi clicado
      cardEscolhido = this;
      div = cardEscolhido.lastElementChild;
      htmlValor = div.querySelector(".valor-plano.ativo");
      atribuiValores(htmlValor, cardEscolhido);
    }
  }

  function pegaValor(card) {
    cardEscolhido = card;
    div = cardEscolhido.lastElementChild;

    if (botaoSwitch.checked) {
      htmlValor = div.querySelector('[data-plano="anual"]'); // Se o checkbox estiver 'on' o valor escolhido será o anual
    } else {
      htmlValor = div.querySelector('[data-plano="mensal"]'); // Se o checkbox estiver 'off' o valor escolhido será o mensal
    }

    atribuiValores(htmlValor, cardEscolhido);
  }

  function atribuiValores(htmlValor, cardEscolhido) {
    const valorPlano = document.querySelector(".plano-escolhido .valor-final");
    valorPlano.innerText = `+${htmlValor.innerText}`; // O valor do plano é atribuido na última seção
    const nomePlano = document.querySelector('[data-nome-plano]');
    nomePlano.innerText = cardEscolhido.querySelector('.nome-plano').innerText;

    const periodos = document.querySelectorAll("[data-periodo]");
    if (!botaoSwitch.checked) {
      periodos[0].innerText = "Monthly"; // Se o checkbox estiver 'off' o período do plano será mensal
      periodos[1].innerText = "month"; // Se o checkbox estiver 'off' o período do plano será mensal
    } else {
      periodos[0].innerText = "Yearly"; // Se o checkbox estiver 'on' o período do plano será anual
      periodos[1].innerText = "year"; // Se o checkbox estiver 'off' o período do plano será mensal
    }
  }

  // Função para controle de adicão/remoção de serviços da seção 'Finishing Up'
  function pegaInformacoesCards(checkbox) {
    const card = checkbox.parentNode;
    const tituloServico = card.querySelector(".servico-titulo").innerText;

    if (checkbox.checked) {
      const precoServico = card.querySelector(".servico-valor.ativo").innerText;
      adicionaServico(tituloServico, precoServico);
    } else {
      // Remove serviço adicional quando checkbox for desmarcado.
      const arrayHtmlServicos =
        servicosEscolhidos.querySelectorAll(".nome-servico");
        arrayHtmlServicos.forEach((nomeServico) => {
        // nomes do serviços na 3º e 4º são equivalentes? então remove o serviço da 4º seção
        if (nomeServico.innerText === tituloServico) {
          servicosEscolhidos.removeChild(nomeServico.parentNode);
        }
      });
    }
  }

  // Adiciona serviço adicional à 4º seção
  function adicionaServico(tituloServico, precoServico) {
    const novoServico = document.createElement("div");
    novoServico.innerHTML = `
    <span class="nome-servico">${tituloServico}</span>
    <span class="valor-final" data-valor-final>${precoServico}</span>`;

    servicosEscolhidos.appendChild(novoServico);
  }

  function mudarPeriodo() {
    inputsCheckbox.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = 0; // desmarca o checkbox
        const cardServico = checkbox.parentNode;
        cardServico.classList.remove("ativo"); // remove cor de borda e background
        pegaInformacoesCards(checkbox);
      }
    });
  }

  // Função para calcular o valor total da soma dos serviçoes escolhidos pelo usuário
  function somaValores() {
    let somaValor = 0;
    let valorLimpo;
    let periodo;
    const valoresServicosEscolhidos =
    document.querySelectorAll("[data-valor-final]");

    // Pega o valor de cada serviço adicionado à última seção e converte ele de string para number, para que a soma possa ser feita
    valoresServicosEscolhidos.forEach((valor) => {
      const valorString = valor.innerText.replace("+$", "");
      if (valorString.endsWith("mo")) {
        valorLimpo = +valorString.replace("/mo", "");
        periodo = "mo";
      } else {
        valorLimpo = +valorString.replace("/yr", "");
        periodo = "yr";
      }

      somaValor += valorLimpo;
    });
    const valorTotal = document.querySelector(".valor-total");
    valorTotal.innerText = `+$${somaValor}/${periodo}`;
  }

  // verifica se o usuário está na seção 'Finishing Up' para poder calcular o valor total
  function verifica() {
    const section = document.querySelector(".secao-finishing");
    if (section.classList.contains("ativo")) {
      somaValores();
    }
  }

  arrayCards.forEach((card) => {
    card.addEventListener("click", verificaOrigemChamada);
  });

  botaoSwitch.addEventListener("click", verificaOrigemChamada);

  inputsCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      pegaInformacoesCards(checkbox);
    });
  });

  botaoSwitch.addEventListener("click", mudarPeriodo);

  const botaoGo = document.querySelector(".next");
  botaoGo.addEventListener("click", verifica);
}