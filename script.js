let stopwatch;
let startTime;
let pausedTime = 0;
let running = false;
let laps = [];
let lapId = 1;


const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const lapButton = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps');


startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
  if (!running) {
    running = true;
    startTime = Date.now() - pausedTime;
    stopwatch = setInterval(updateDisplay, 10);
  }
}

function pauseStopwatch() {
  if (running) {
    running = false;
    clearInterval(stopwatch);
    pausedTime = Date.now() - startTime;
  }
}

function resetStopwatch() {
  pauseStopwatch();
  timeDisplay.innerText = '00:00:00';
  pausedTime = 0;
  laps = [];
  lapId = 1;
  lapsList.innerHTML = '';
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  timeDisplay.innerText = formattedTime;
}

function formatTime(time) {
  let milliseconds = Math.floor(time % 1000 / 10);
  let seconds = Math.floor(time / 1000 % 60);
  let minutes = Math.floor(time / 1000 / 60 % 60);

  milliseconds = (milliseconds < 10 ? '0' : '') + milliseconds;
  seconds = (seconds < 10 ? '0' : '') + seconds;
  minutes = (minutes < 10 ? '0' : '') + minutes;

  return `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (running) {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    const lapTime = { id: lapId++, time: formattedTime };
    laps.push(lapTime);
    displayLaps();
  }
}

function displayLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap) => {
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lap.id}: ${lap.time}`;
    lapsList.appendChild(lapItem);
  });
}

