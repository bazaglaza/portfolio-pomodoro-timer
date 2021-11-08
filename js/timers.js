//--------
const MAIN_TIMER_CONTROL_BUTTON_ID = "timer-button";
const MAIN_POMODORO_SWITCHER_BUTTON_ID = "pomodoro-menu-button";
const MAIN_SHORT_BREAK_SWITCHER_BUTTON_ID = "sort-break-menu-button";
const MAIN_LONG_BREAK_SWITCHER_BUTTON_ID = "long-break-menu-button";

//--------

var timerValueHTML = document.getElementById(MAIN_TIMER_ID);
var timerControlBtn = document.getElementById(MAIN_TIMER_CONTROL_BUTTON_ID);

const TIMER_CONTROL_BUTTON_STATES = ['start', 'pause', 'restart'];

const TIMER_CONTROL_OPTIONS = {
    "start": "S&ensp;T&ensp;A&ensp;R&ensp;T",
    "pause": "P&ensp;A&ensp;U&ensp;S&ensp;E",
    "restart": "R&ensp;E&ensp;S&ensp;T&ensp;A&ensp;R&ensp;T",
};

var timerSwitcherButtons = [
    document.getElementById(MAIN_POMODORO_SWITCHER_BUTTON_ID),
    document.getElementById(MAIN_SHORT_BREAK_SWITCHER_BUTTON_ID),
    document.getElementById(MAIN_LONG_BREAK_SWITCHER_BUTTON_ID)
];

var TIMER_CONTROL_CURRENT_STATE = 'start';
var ACTIVE_TIMER_VALUE = getDefaultActiveTimerValue();

//--------

const ACTIVE_TIMER_SWITCHER_CLASS = 'menu-button_active';

//--------

const PROGRESS_ACTIVE_BLOCK_ID = 'progress';
const PROGRESS_LEFT_COVER_ID = 'left-cover';
const PROGRESS_RIGHT_COVER_ID = 'right-cover';

var progress = document.getElementById(PROGRESS_ACTIVE_BLOCK_ID);
var progressLeftCover = document.getElementById(PROGRESS_LEFT_COVER_ID);
var progressRightCover = document.getElementById(PROGRESS_RIGHT_COVER_ID);

//--------

timerSwitcherButtons.forEach(function(element, index) {
    element.onclick = function() {
        timerStop();
        setActiveTimer(TIMERS[index]);
        resetActiveTimerValue();
        clearProgress(progress);
        activeteSwitcherGui(index, timerSwitcherButtons);
        defaultUpdateActiveTimerHTML(getActiveTimer());
    }
});

timerControlBtn.onclick = function(){
    if (TIMER_CONTROL_CURRENT_STATE === 'start') {
        timerStart();
    } else if (TIMER_CONTROL_CURRENT_STATE === 'pause') {
        timerPause();
    } else if (TIMER_CONTROL_CURRENT_STATE === 'restart') {
        timerRestart();
    }
}

var INTERVAL;

function timerStart(){
    var progress_interval = 360 / getDefaultActiveTimerValue(getActiveTimer());
    console.log(getDefaultActiveTimerValue(getActiveTimer()) + ' ' + progress_interval);
    if (ACTIVE_TIMER_VALUE > 0) {
        decreaseActiveTimer(timerValueHTML);
        moveProgress(progress, progress_interval);
    }

    INTERVAL = setInterval(function(){
        if (ACTIVE_TIMER_VALUE == 0){
            updateTimerControlButton(timerControlBtn, 'restart');
            clearInterval(INTERVAL);
            playTimerEndSound();
        } else {
            decreaseActiveTimer(timerValueHTML);
            moveProgress(progress, progress_interval);
        }
    }, 1000);
    updateTimerControlButton(timerControlBtn, 'pause');
}

function timerPause(){
    clearInterval(INTERVAL);
    updateTimerControlButton(timerControlBtn, 'start');
}
function timerRestart(){
    ACTIVE_TIMER_VALUE = getDefaultActiveTimerValue();
    clearProgress();
    timerStart();
}
function timerStop() {
    clearInterval(INTERVAL);
    updateTimerControlButton(timerControlBtn, 'start');
}

function resetActiveTimerValue() {
    ACTIVE_TIMER_VALUE = getDefaultActiveTimerValue();
}

function updateTimerControlButton(button, state) {
    if (TIMER_CONTROL_BUTTON_STATES.includes(state)) {
        TIMER_CONTROL_CURRENT_STATE = state;
        button.innerHTML = TIMER_CONTROL_OPTIONS[TIMER_CONTROL_CURRENT_STATE];
    } else {
        console.log('THE (' + state +') is not in (' + TIMER_CONTROL_BUTTON_STATES + ').');
    }
}

function playTimerEndSound(){
    var audio = new Audio('sounds/end-timer-sound.mp3');
    audio.play();
}

function decreaseActiveTimer(timer) {
    ACTIVE_TIMER_VALUE = ACTIVE_TIMER_VALUE - 1;
    timer.innerHTML = secondsToString(ACTIVE_TIMER_VALUE);
}

function activeteSwitcherGui(activeElemIndex, elementsArray){
    elementsArray.forEach(function(element, index) {
        if(index == activeElemIndex) {
            if(!element.classList.contains(ACTIVE_TIMER_SWITCHER_CLASS)){
                element.classList.add(ACTIVE_TIMER_SWITCHER_CLASS);
            }
        } else {
            if(element.classList.contains(ACTIVE_TIMER_SWITCHER_CLASS)){
                element.classList.remove(ACTIVE_TIMER_SWITCHER_CLASS);
            }
        }
    })
}

function getRotationDegrees(element) {
    var matrix = getComputedStyle(element).transform;
    console.log(matrix);
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.atan2(b, a) * (180/Math.PI);
    } else { var angle = 0; }
    return angle;
}
function setRotationDegrees(element, deg) {
    element.style.transform = 'rotate(' + deg + 'deg)';
}
function moveProgress(element, interval) {
    if (interval == 0) { return; }
    var current_deg = getRotationDegrees(element);
    console.log(current_deg);
    var final_deg = current_deg - interval;
    if (final_deg < -180 ) {
        progressLeftCover.style.visibility = 'visible';
        progressRightCover.style.visibility = 'hidden';
    }
    setRotationDegrees(element, final_deg);
}
function clearProgress() {
    progressLeftCover.style.visibility = 'hidden';
    progressRightCover.style.visibility = 'visible';
    setRotationDegrees(progress, 0);
}
