// Atualizar a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);

// Atualizar a data e hora imediatamente ao carregar a página
window.addEventListener('load', atualizarDataHora);

function atualizarDataHora() {
    const dataHoraElement = document.getElementById('data-hora');
    const agora = new Date();

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric'};
    const dataHoraFormatada = agora.toLocaleDateString('pt-PT', options);

    dataHoraElement.textContent = dataHoraFormatada;
}




//slide

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex ++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides,10000) //10 segundos
}

document.querySelector('.toggleMenu').addEventListener('click', function() {
  var menu = document.querySelector('.menu-m');
  menu.classList.toggle('active');
});


function toggleService(serviceId) {
  var content = document.getElementById(serviceId + '-content');
  if (content) {
      content.classList.toggle('show');
  }
}