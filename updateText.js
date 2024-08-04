'use strict';

// Customizable text for day and night values and shared value name
export var scriptProperties = createScriptProperties()
    .addText({
        name: 'dayText',
        label: 'Day Text',
        value: 'Good day!'
    })
    .addText({
        name: 'nightText',
        label: 'Night Text',
        value: 'Good night!'
    })
    .finish();

let currentText;

function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= 0.275 && currentTime < 0.875;
}

export function init(value) {
    // Initialize currentText based on initial state
    let initialState = shared.currentState || 'automatic';
    if (initialState === 'day') {
        currentText = scriptProperties.dayText;
    } else if (initialState === 'night') {
        currentText = scriptProperties.nightText;
    } else {
        currentText = isDayTime() ? scriptProperties.dayText : scriptProperties.nightText;
    }

    // Save the initial value to the shared value
    shared[scriptProperties.sharedValueName] = currentText;
}

export function update(value) {
    let currentState = shared.currentState;
    let newText;

    if (currentState === 'day') {
        newText = scriptProperties.dayText;
    } else if (currentState === 'night') {
        newText = scriptProperties.nightText;
    } else if (currentState === 'automatic') {
        newText = isDayTime() ? scriptProperties.dayText : scriptProperties.nightText;
    }

    return newText;
}
