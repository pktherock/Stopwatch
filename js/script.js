const Timer_count = document.querySelector('.timer_count');
const PlayPauseBtn = document.getElementById('playPauseBtn');
const TrackLapsBtn = document.getElementById('trackLapsBtn');
const ResetBtn = document.getElementById('resetBtn');

let [seconds, minutes, hours] = [0, 0, 0];
let isPaused = false;
let isTimerStarted = false;
let timer = null;

// function to get 0 formatted num if number is less then 10
const getFormattedNumber = (num) => (num < 10 ? `0${num}` : num);

// function which will run in every second and update stopwatch
const stopWatch = () => {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  const hour = getFormattedNumber(hours);
  const minute = getFormattedNumber(minutes);
  const second = getFormattedNumber(seconds);

  Timer_count.textContent = `${hour}:${minute}:${second}`;
};

const setDisableClassToButton = () => {
  if (isTimerStarted) {
    ResetBtn.classList.remove('disabled');
  }

  if (isTimerStarted && !isPaused) {
    TrackLapsBtn.classList.remove('disabled');
    Timer_count.classList.remove('timer_count_stop');
  } else {
    TrackLapsBtn.classList.add('disabled');
    Timer_count.classList.add('timer_count_stop');
  }
};

// function which will run on click of start and stop(PlayPauseBtn) button
const startStopWatch = () => {
  if (timer !== null && !isPaused) {
    PlayPauseBtn.classList.remove('fa-pause');
    PlayPauseBtn.classList.add('fa-play');
    clearInterval(timer);
    isPaused = true;
  } else {
    PlayPauseBtn.classList.remove('fa-play');
    PlayPauseBtn.classList.add('fa-pause');
    timer = setInterval(stopWatch, 1000);
    isPaused = false;
    isTimerStarted = true;
  }

  setDisableClassToButton();
};

// Function which will run on click of reset button
const resetStopWatch = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    [seconds, minutes, hours] = [0, 0, 0];
    PlayPauseBtn.classList.remove('fa-pause');
    PlayPauseBtn.classList.add('fa-play');

    ResetBtn.classList.add('disabled');
    TrackLapsBtn.classList.add('disabled');

    Timer_count.textContent = '00:00:00';
    Timer_count.classList.add('timer_count_stop');
  }
};

const addLapsToTable = () => {
  console.log('will be updated soon..');
};

// Event listener on action buttons
PlayPauseBtn.addEventListener('click', startStopWatch);
TrackLapsBtn.addEventListener('click', addLapsToTable);
ResetBtn.addEventListener('click', resetStopWatch);
