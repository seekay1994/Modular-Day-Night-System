'use strict';

// Customizable sliders and text for day and night values and shared value name
export var scriptProperties = createScriptProperties()
    .addSlider({
        name: 'dayValue',
        label: 'Day Value',
        value: 0.8,
        min: 0,
        max: 1,
        integer: false
    })
    .addSlider({
        name: 'nightValue',
        label: 'Night Value',
        value: 0.2,
        min: 0,
        max: 1,
        integer: false
    })
    .addText({
        name: 'sharedValueName',
        label: 'Shared Value Name',
        value: 'sharedDnNValue'
    })
    .finish();

let currentValue;

function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= 0.275 && currentTime < 0.875;
}

export function init(value) {
    // Initialize currentValue based on initial state
    let initialState = shared.currentState || 'automatic';
    if (initialState === 'day') {
        currentValue = scriptProperties.dayValue;
    } else if (initialState === 'night') {
        currentValue = scriptProperties.nightValue;
    } else {
        currentValue = isDayTime() ? scriptProperties.dayValue : scriptProperties.nightValue;
    }

    // Save the initial value to the shared value
    shared[scriptProperties.sharedValueName] = currentValue;
}

export function update(value) {
    let currentState = shared.currentState;
    let newValue;

    if (currentState === 'day') {
        newValue = scriptProperties.dayValue;
    } else if (currentState === 'night') {
        newValue = scriptProperties.nightValue;
    } else if (currentState === 'automatic') {
        newValue = isDayTime() ? scriptProperties.dayValue : scriptProperties.nightValue;
    }

    // Save the value to the shared value
    shared[scriptProperties.sharedValueName] = newValue;

    return newValue;
}
