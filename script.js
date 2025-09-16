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
