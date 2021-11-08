// Global strings variables for classes and IDs of elements
    const SETTINGS_APPLY_BUTTON_ID = 'apply-button';
    const SETTINGS_POMODORO_TIMER_ID = 'pomodoro-settings';
    const SETTINGS_SHORT_BREAK_TIMER_ID = 'short-break-settings';
    const SETTINGS_LONG_BREAK_TIMER_ID = 'long-break-settings';
    const SETTINGS_FONT_OPTIONS_IDS = ['font-kumbh-sans', 'font-roboto-slab', 'font-space-mono'];
    const SETTINGS_COLOR_OPTIONS_IDS = ['color-pink', 'color-blue', 'color-purple'];
    const SETTINGS_FONT_OPTION_ACTIVE_CLASS = 'active-font-option';
    const SETTINGS_COLOR_OPTION_ACTIVE_CLASS = 'active-color-option';
    //------------------------------

    // Getting all necessary Elements
    const settingsApplyBtn = document.getElementById(SETTINGS_APPLY_BUTTON_ID); // Get the Apply button on settings window
    const settingsPomodoroTimer = document.getElementById(SETTINGS_POMODORO_TIMER_ID); // Get the Pomodoro timer settings
    const settingsSortBreackTimer = document.getElementById(SETTINGS_SHORT_BREAK_TIMER_ID); // Get the Short break timer settings
    const settingsLongBreakTimer = document.getElementById(SETTINGS_LONG_BREAK_TIMER_ID); // Get the Long break timer settings

    const fontOptionElements = [
        document.getElementById(SETTINGS_FONT_OPTIONS_IDS[0]),
        document.getElementById(SETTINGS_FONT_OPTIONS_IDS[1]),
        document.getElementById(SETTINGS_FONT_OPTIONS_IDS[2])
    ];

    const colorOptionElements = [
        document.getElementById(SETTINGS_COLOR_OPTIONS_IDS[0]),
        document.getElementById(SETTINGS_COLOR_OPTIONS_IDS[1]),
        document.getElementById(SETTINGS_COLOR_OPTIONS_IDS[2])
    ];
    //------------------------------

    fontOptionElements.forEach(function(element, index){
        element.onclick = function() {
            setActiveFont(OPTIONS[index]);
            activeteOptionGui(index, fontOptionElements, 'FONT');
        }
    });

    colorOptionElements.forEach(function(element, index){
        element.onclick = function() {
            setActiveColor(OPTIONS[index]);
            activeteOptionGui(index, colorOptionElements, 'COLOR');
        }
    });

    settingsApplyBtn.onclick = function() {
        setDefaultPomodoroTimer(settingsPomodoroTimer.value * 60); // The global variable from default-timer-settings.js
        setDefaultShortBreakTimer(settingsSortBreackTimer.value * 60); // The global variable from default-timer-settings.js
        setDefaultLongBreakTimer(settingsLongBreakTimer.value * 60); // The global variable from default-timer-settings.js
        resetActiveTimerValue();
        defaultUpdateActiveTimerHTML(getActiveTimer());
        applyColorFontOptions(getActiveColor(), getActiveFont());
    }

// Functions which need to be refactored or moved to other files

    function activeteOptionGui(activeElemIndex, elementsArray, optionType){ //optionType = ['FONT', 'COLOR']
        var active_class = '';
        if (optionType == 'FONT') {
            active_class = SETTINGS_FONT_OPTION_ACTIVE_CLASS;
        } else if (optionType == 'COLOR') {
            active_class = SETTINGS_COLOR_OPTION_ACTIVE_CLASS;
        } else {
            console.log("Wrong optionType parameter. It should be 'FONT' or 'COLOR' ");
        }
        elementsArray.forEach(function(element, index) {
            if(index == activeElemIndex) {
                if(!element.classList.contains(active_class)){
                    element.classList.add(active_class);
                }
            } else {
                if(element.classList.contains(active_class)){
                    element.classList.remove(active_class);
                }
            }
        })
    }
