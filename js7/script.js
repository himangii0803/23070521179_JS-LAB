const lights = document.querySelectorAll('.light');
const timerDisplay = document.querySelector('.timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

let intervalId;
let currentLight = 0; // 0: red, 1: green, 2: yellow
let timeLeft = 3;

function updateLights() {
    lights.forEach(light => light.classList.remove('active'));
    lights[currentLight].classList.add('active');
}

function updateTimer() {
    timerDisplay.textContent = `Timer: ${timeLeft}`;
}

function cycleLights() {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
        currentLight = (currentLight + 1) % 3;
        updateLights();
        timeLeft = 3;
    }
}

function startSimulation() {
    if (!intervalId) {
        updateLights();
        updateTimer();
        intervalId = setInterval(cycleLights, 1000);
    }
}

function stopSimulation() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

startBtn.addEventListener('click', startSimulation);
stopBtn.addEventListener('click', stopSimulation);