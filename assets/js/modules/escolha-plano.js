export default function escolhaPlano() {
  const planos = document.querySelectorAll(".container-plano");

  function planoEscolhido() {
    if (this.classList.contains("container-plano")) {
      const plano = this;

      planos.forEach((plano) => {
        plano.classList.remove("escolhido");
      });

      plano.classList.add("escolhido"); // adiciona a classe ao card que foi clicado
    }
  }

  planos.forEach((plano) => {
    plano.addEventListener("click", planoEscolhido);
  });
}