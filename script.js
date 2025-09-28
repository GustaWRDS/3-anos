function calcTimeTogether() {
  const startDate = new Date("2022-10-17T00:00:00");
  const now = new Date();

  let diff = now - startDate;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let years = Math.floor(days / 365);
  let months = Math.floor((days % 365) / 30);
  let remainingDays = days - (years * 365 + months * 30);

  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("timeTogether").innerText =
    `${years} anos, ${months} meses, ${remainingDays} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos 💕`;
}

setInterval(calcTimeTogether, 1000);

// --- Carrossel responsivo (usa % em vez de px)
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
const sliderEl = document.querySelector('.slider');

let index = 0;
const total = images.length;

// criar bolinhas dinamicamente
for (let i = 0; i < total; i++) {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
}

let dots = dotsContainer.querySelectorAll('span');

function showSlide() {
  // mover em porcentagem — cada slide ocupa 100% do .slider
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function goToSlide(n) {
  index = (n + total) % total;
  showSlide();
}

function nextSlide() {
  index = (index + 1) % total;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + total) % total;
  showSlide();
}

prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

// autoplay com pausar ao hover e reiniciar
let autoSlideInterval = setInterval(nextSlide, 3000);

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}

if (sliderEl) {
  sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  sliderEl.addEventListener('mouseleave', () => resetAutoSlide());
}

// melhorias: toque/swipe simples (mobile)
let startX = 0;
let isTouching = false;

sliderEl.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isTouching = true;
  clearInterval(autoSlideInterval);
});

sliderEl.addEventListener('touchmove', (e) => {
  if (!isTouching) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  // se arrastou o suficiente:
  if (Math.abs(diff) > 40) {
    if (diff > 0) nextSlide();
    else prevSlide();
    isTouching = false;
  }
});

sliderEl.addEventListener('touchend', () => {
  isTouching = false;
  resetAutoSlide();
});
// 
