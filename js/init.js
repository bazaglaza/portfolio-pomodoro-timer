applyColorFontOptions(getActiveColor(), getActiveFont());

var default_timer = document.getElementById('timer');

var settings_pomodoro = document.getElementById('pomodoro-settings');
var settings_sort_break = document.getElementById('short-break-settings');
var settings_long_break = document.getElementById('long-break-settings');

default_timer.innerHTML = secondsToString(getDefaultActiveTimerValue());

settings_pomodoro.setAttribute('value', (getDefaultActiveTimerValue() / 60));
settings_sort_break.setAttribute('value', (getDefaultShortBreakTimer() / 60));
settings_long_break.setAttribute('value', (getDefaultLongBreakTimer() / 60));
