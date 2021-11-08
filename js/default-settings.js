var DEFAULT_POMODORO_TIMER = 30 * 60; //The pomodoro timer value in seconds
var DEFAULT_SHORT_BREAK_TIMER = 5 * 60; //The short break timer in seconds
var DEFAULT_LONG_BREAK_TIMER = 15 * 60; // The long break timer in seconds

var TIMERS = ['pomodoro', 'short', 'long'];
var ACTIVE_TIMER = 'pomodoro'; // 'pomodoro', 'short', 'long'

const OPTIONS = ["first-option", "second-option", "third-option"];

const SETTINGS_FONT_OPTIONS = {
    "first-option": "font-option-kumbh-sans",
    "second-option": "font-option-roboto-slab",
    "third-option": "font-option-space-mono",
}
const SETTINGS_COLOR_OPTIONS = {
    "first-option": "color-option-pink",
    "second-option": "color-option-blue",
    "third-option": "color-option-purple",
}
var ACTIVE_FONT = SETTINGS_FONT_OPTIONS["first-option"];
var ACTIVE_COLOR = SETTINGS_COLOR_OPTIONS["first-option"];

//-----------------------------------------
const MAIN_TIMER_ID = "timer";
//-----------------------------------------
// Defaut timers setters and getters
function setDefaultPomodoroTimer(value) { DEFAULT_POMODORO_TIMER = value; }
function setDefaultShortBreakTimer(value) { DEFAULT_SHORT_BREAK_TIMER = value; }
function setDefaultLongBreakTimer(value) { DEFAULT_LONG_BREAK_TIMER = value; }

function getDefaultPomodoroTimer() { return DEFAULT_POMODORO_TIMER; }
function getDefaultShortBreakTimer() { return DEFAULT_SHORT_BREAK_TIMER; }
function getDefaultLongBreakTimer() { return DEFAULT_LONG_BREAK_TIMER; }

function setActiveTimer(value) {
    if (TIMERS.includes(value)) { ACTIVE_TIMER = value; }
}
function getActiveTimer() { return ACTIVE_TIMER; } //retuns 'pomodoro' or 'short' or 'long'

function getDefaultActiveTimerValue(timer) {
    var active_timer = getActiveTimer();
    if (active_timer === 'pomodoro') {
        return getDefaultPomodoroTimer();
    } else if (active_timer === 'short') {
        return getDefaultShortBreakTimer();
    } else if (active_timer === 'long') {
        return getDefaultLongBreakTimer();
    }
}

//------------------------------------------
// Active Fonts and Collors setters and getters
function getActiveFont() { return ACTIVE_FONT; }
function getActiveColor() { return ACTIVE_COLOR; }

function setActiveFont(option) {
    if (OPTIONS.includes(option)) {
        ACTIVE_FONT = SETTINGS_FONT_OPTIONS[option];
    } else { console.log('Wrong font option. The ' + option + ' is not in the [' + OPTIONS + '] list.'); }
}

function setActiveColor(option) {
    if (OPTIONS.includes(option)) {
        ACTIVE_COLOR = SETTINGS_COLOR_OPTIONS[option];
    } else { console.log('Wrong color optionThe ' + option + ' is not in the [' + OPTIONS + '] list.'); }
}

function defaultUpdateActiveTimerHTML(activeTimer) {
    var timer = document.getElementById(MAIN_TIMER_ID);
    if (activeTimer == 'pomodoro') {
        updateActiveTimerByValueHTML(timer, getDefaultPomodoroTimer());
    } else if (activeTimer == 'short'){
        updateActiveTimerByValueHTML(timer, getDefaultShortBreakTimer());
    } else if (activeTimer == 'long'){
        updateActiveTimerByValueHTML(timer, getDefaultLongBreakTimer());
    }
}

function updateActiveTimerByValueHTML(timer, value) {
    timer.innerHTML =  secondsToString(value);
}

function applyColorFontOptions(color, font){
    document.documentElement.className = color + ' ' + font;
}

// Helpers

function secondsToString(secondsNum) {
    var tSeconds = secondsNum % 60;
    var tMinutes = (secondsNum - tSeconds) / 60;
    return formatTime(tMinutes) + ':' + formatTime(tSeconds);
}

function formatTime (num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}
