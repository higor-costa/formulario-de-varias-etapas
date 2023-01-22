export default function servicoAdicional() {
  const inputsServicos = document.querySelectorAll("[data-servico-adicional]");

  function escolhaServico() {
    const card = this.parentNode;
    card.classList.toggle("ativo"); // card do serviço escolhido receberá cor de borda e fundo específico
  }

  inputsServicos.forEach((input) => {
    input.addEventListener("click", escolhaServico);
  });
}