export default function planoMensalAnual() {
  const botaoSwitch = document.querySelector('[type="checkbox"]');
  function exibeMensalAnual() {
    const planoMensal = document.querySelectorAll('[data-plano="mensal"]');
    const planoAnual = document.querySelectorAll('[data-plano="anual"]');
    const bonusPlano = document.querySelectorAll("[data-bonus]");
    const periodosPlanos = document.querySelectorAll(".switch-planos span");
    const valoresServicosAdicionais = document.querySelectorAll('.servico-valor');

    planoAnual.forEach((plano) => {
      plano.classList.toggle("ativo"); // controla exibição do valor anual
    });

    planoMensal.forEach((plano) => {
      plano.classList.toggle("ativo"); // controla exibição do valor mensal
    });

    bonusPlano.forEach((bonus) => {
      bonus.classList.toggle("ativo"); // controla exibição dos bônus
    });

    periodosPlanos.forEach((opcao) => {
      opcao.classList.toggle("ativo"); // período escolhido recebe cor mais escura
    });

    valoresServicosAdicionais.forEach((valor) => {
      valor.classList.toggle('ativo');
    });
  }
  botaoSwitch.addEventListener("click", exibeMensalAnual);
}