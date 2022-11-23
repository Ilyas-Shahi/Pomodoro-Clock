const sessionType = document.getElementById('session-type');

const mainTime = document.getElementById('main-time');
const mainTimeMins = mainTime.querySelector('#main-time_mins');
const mainTimeSecs = mainTime.querySelector('#main-time_secs');

const startPauseBtn = document.getElementById('start-pause');
const startPauseBtnIcon = document.querySelector('#start-pause_icon');
const startPauseBtnText = document.querySelector('#start-pause_text');
const resetBtn = document.getElementById('reset');

const sessionLnt = document.getElementById('session-time');
const sessionLntUp = document.getElementById('session-up');
const sessionLntDown = document.getElementById('session-down');

const breakLnt = document.getElementById('break-time');
const breakLntUp = document.getElementById('break-up');
const breakLntDown = document.getElementById('break-down');

const notificationAudio = new Audio('./notification.wav');

let timerRunning = false;
let switchSession = false;
let interval;

// Start btn event listener
startPauseBtn.addEventListener('click', () => {
  if (startPauseBtnIcon.classList[1] === 'fa-play') {
    startPauseBtnIcon.className = 'fas fa-pause';
    startPauseBtnText.innerText = 'Pause';
  } else {
    startPauseBtnIcon.className = 'fas fa-play';
    startPauseBtnText.innerText = 'Start';
  }

  timerRunning = !timerRunning;

  startTimer();
});

// Reset btn
resetBtn.addEventListener('click', () => {
  timerRunning = false;

  startPauseBtnIcon.className = 'fas fa-play';
  startPauseBtnText.innerText = 'Start';

  mainTimeMins.textContent = '25';
  mainTimeSecs.textContent = '00';
  sessionLnt.textContent = '25';
  breakLnt.textContent = '5';
});

// Start timer
let minutes;
let seconds;

function startTimer() {
  minutes = Number(mainTimeMins.textContent);
  seconds = Number(mainTimeSecs.textContent);

  if (seconds !== 0) seconds -= 1;

  if (timerRunning) {
    interval = setInterval(startInterval, 1000);
  } else {
    clearInterval(interval);
  }

  function startInterval() {
    mainTimeMins.textContent = toTwoDigits(minutes);
    mainTimeSecs.textContent = toTwoDigits(seconds);

    if (minutes <= 0 && seconds <= 0) {
      switchSession = !switchSession;
      changeSessionType();
      clearInterval(interval);
    }

    if (seconds === 0) {
      minutes -= 1;
      seconds = 60;
    }

    seconds--;
  }
}

// Switch timer to and from break/session
function changeSessionType() {
  notificationAudio.play();
  if (switchSession) {
    mainTimeMins.textContent = breakLnt.textContent;
    sessionType.textContent = 'Break';
    startTimer();
  } else {
    mainTimeMins.textContent = sessionLnt.textContent;
    sessionType.textContent = 'Session';
    startTimer();
  }
}

// Set session and break length
sessionLntUp.addEventListener('click', () => {
  if (!timerRunning && sessionLnt.textContent < 60) {
    sessionLnt.textContent = Number(sessionLnt.textContent) + 1;
    mainTimeMins.textContent = sessionLnt.textContent;
    mainTimeSecs.textContent = '00';
  }
});

sessionLntDown.addEventListener('click', () => {
  if (!timerRunning && sessionLnt.textContent > 1) {
    sessionLnt.textContent = Number(sessionLnt.textContent) - 1;
    mainTimeMins.textContent = sessionLnt.textContent;
    mainTimeSecs.textContent = '00';
  }
});

breakLntUp.addEventListener('click', () => {
  if (!timerRunning && sessionLnt.textContent < 60) {
    breakLnt.textContent = Number(breakLnt.textContent) + 1;
  }
});

breakLntDown.addEventListener('click', () => {
  if (!timerRunning && breakLnt.textContent > 1) {
    breakLnt.textContent = Number(breakLnt.textContent) - 1;
  }
});

function toTwoDigits(num) {
  return num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
}
