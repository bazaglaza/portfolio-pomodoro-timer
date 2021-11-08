// Global strings variables for classes and IDs of elements
const MAIN_OPEN_SETTINGS_BUTTON_ID = 'settings-button';
const SETTINGS_WINDOW_ID = 'settings';
const SETTINGS_CLOSE_BUTTON_ID = 'settings-close-button';
//--------------------------

const mainOpenSettingsBtn = document.getElementById(MAIN_OPEN_SETTINGS_BUTTON_ID); // Get the button that opens the settings window
const settingsWindow = document.getElementById(SETTINGS_WINDOW_ID); // Get the settings window
const settingsCloseBtn = document.getElementById(SETTINGS_CLOSE_BUTTON_ID); // Get the element that closes the settings window

// Open the settings window by clicking on settings button on main window
mainOpenSettingsBtn.onclick = function() { showBlock(settingsWindow); }

// Close the settings window by clicking on close button
settingsCloseBtn.onclick = function() { hideBlock(settingsWindow); }

// Close the settings window by clicking anywhere outside the settings window
window.onclick = function(event) {
    if (event.target == settingsWindow) { hideBlock(settingsWindow); }
}

// Show and hide block elements functions
function showBlock (block) { block.style.display = "block"; }
function hideBlock (block) { block.style.display = "none"; }
