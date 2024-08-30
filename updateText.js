'use strict';

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

export function init(value) {
    // Initialize currentText based on initial state
    let initialState = shared.currentTODState;
    if (initialState === 'day') {
        currentText = scriptProperties.dayText;
    } else if (initialState === 'night') {
        currentText = scriptProperties.nightText;
    }

    // Save the initial value to the shared value
    shared[scriptProperties.sharedValueName] = currentText;
}

export function update(value) {
    let currentState = shared.currentTODState;
    let newText;

    if (currentState === 'day') {
        newText = scriptProperties.dayText;
    } else if (currentState === 'night') {
        newText = scriptProperties.nightText;
    }

    return newText;
}
