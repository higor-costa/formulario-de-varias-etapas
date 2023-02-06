export default function servicoAdicional() {
  const inputsCheckbox = document.querySelectorAll("[data-input-checkbox]");

  function escolhaServico() {
    const card = this.parentNode;
    card.classList.toggle("ativo"); // card do serviço escolhido receberá cor de borda e fundo específico
  }

  inputsCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", escolhaServico);
  });
}