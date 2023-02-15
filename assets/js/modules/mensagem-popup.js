export default function mensagemPopup() {
    const popup = document.querySelector(".popup");
    const controlesPopup = document.querySelectorAll('[data-popup]');
    const iconeExclamacao = controlesPopup[0];
    const botaoNext = document.querySelector('.next');
    
    function controleExibicaoPopup() {
      if(this.dataset.popup === "abrir") {
        popup.classList.add("ativo");
        this.classList.remove('ativo');
      } 
      else if (this.dataset.popup === "fechar") {
        popup.classList.remove("ativo");
        iconeExclamacao.classList.add('ativo');
      }
    
      setTimeout(() => {
        if (this === botaoNext && popup.classList.contains("ativo")) {
          popup.classList.remove("ativo");
          iconeExclamacao.classList.add('ativo');
        }
      }, 3000);
    }
    
    controlesPopup.forEach(controle => {
        controle.addEventListener('click', controleExibicaoPopup)
    });
    
    botaoNext.addEventListener('click', controleExibicaoPopup);
}