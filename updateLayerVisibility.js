'use strict';

// Function to determine if it is day or night based on the current time
function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= 0.275 && currentTime < 0.875;
}

export function update(value) {
    let currentState = shared.currentState;
    let newColor;

    if (currentState === 'day') {
        thisLayer.visible = true;
    } else if (currentState === 'night') {
        thisLayer.visible = false;
    } else if (currentState === 'automatic') {
        thisLayer.visible = isDayTime() ? true : false;
    }
}