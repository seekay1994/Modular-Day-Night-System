'use strict';

export var scriptProperties = createScriptProperties()
    .addCheckbox({  name: 'isAutomatic',    label: 'Automatic Mode',    value: true})
    .addCheckbox({  name: 'isDay',          label: 'Day Mode',          value: false})
    .addCheckbox({  name: 'isNight',        label: 'Night Mode',        value: false})
    .addSlider({    name: 'dayStart',       label: 'Day Start',         value: 8,   min: 0, max: 24,    integer: true})
    .addSlider({    name: 'nightStart',     label: 'Night Start',       value: 20,  min: 0, max: 24,    integer: true})
.finish();

let lastKnownState = '';

export function init() {
    shared.currentTODState = getCurrentState();
    lastKnownState = shared.currentTODState;
}


export function update() {
    let currentState = getCurrentState();
    if (currentState !== lastKnownState) {
        lastKnownState = currentState;
        shared.currentTODState = currentState;
    }
}


function getCurrentState() {
    if (scriptProperties.isAutomatic) {
        return isDayTime() ? 'day' : 'night';
    } else if (scriptProperties.isDay) {
        return 'day';
    } else if (scriptProperties.isNight) {
        return 'night';
    }
    return 'automatic';
}


function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= (scriptProperties.dayStart / 24) && currentTime < (scriptProperties.nightStart / 24);
}