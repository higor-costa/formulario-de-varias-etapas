export default function mensagemPopup() {
    const popup = document.querySelector(".popup");
    const controlesPopup = document.querySelectorAll('[data-popup]');
    const iconeExclamacao = controlesPopup[0];
    const botaoNext = document.querySelector('.next');
    
    function controleExibicaoPopup() {
      // Se o this for o icone de exclamação, ele será escondido e o pop-up será exibido
      if(this.dataset.popup === "abrir") {
        popup.classList.add("ativo");
        this.classList.remove('ativo');
      } 
      // Se o this for o icone do X, o pop-up será escondido e o icone de exclamação será exibido
      else if (this.dataset.popup === "fechar") {
        popup.classList.remove("ativo");
        iconeExclamacao.classList.add('ativo');
      }
    
      setTimeout(() => {
        // Caso a função tenha sido chamada pelo botão 'Next Step' e o pop-up esteja visivel, pop-up será escondido, 3s 
        if (this === botaoNext && popup.classList.contains("ativo")) {
          popup.classList.remove("ativo");
          iconeExclamacao.classList.add('ativo');
        }
      }, 3000);
    }
    
    controlesPopup.forEach(controle => {
        controle.addEventListener('click', controleExibicaoPopup);
    });
    
    botaoNext.addEventListener('click', controleExibicaoPopup);
}