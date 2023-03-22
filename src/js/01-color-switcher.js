const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
    intervalId = setInterval(changeBackgroundColor, 1000);
  });

stopBtn.addEventListener('click', () => {
    intervalId = clearInterval(intervalId);
});