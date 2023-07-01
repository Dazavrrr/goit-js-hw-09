const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

startButton.addEventListener('click', toggleColorSwitch);
stopButton.addEventListener('click', toggleColorSwitch);

function toggleColorSwitch() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
    intervalId = setInterval(changeBackgroundColor, 1000);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
function changeBackgroundColor() {
  const gradient = getRandomGradient();
  document.body.style.background = gradient;
}

function getRandomGradient() {
  const angle = Math.floor(Math.random() * 400);
  const color1 = getRandomHexColor();
  const color2 = getRandomHexColor();

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}