// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateTime() {
    const currentTime = Date.now();
    const totalTime = elapsedTime + (isRunning ? (currentTime - startTime) : 0);
    display.textContent = formatTime(totalTime);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
    }
}

function pause() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime += Date.now() - startTime;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    laps = [];
    display.textContent = formatTime(0);
    lapsList.innerHTML = '';
}

function lap() {
    laps.push(elapsedTime + (isRunning ? (Date.now() - startTime) : 0));
    const lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
