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
    .addSlider({
        name: 'transitionSpeed',
        label: 'Transition Speed',
        value: 1, // Faster transition speed
        min: 0.01,
        max: 5,
        integer: false
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
    let targetValue;

    if (currentState === 'day') {
        targetValue = scriptProperties.dayValue;
    } else if (currentState === 'night') {
        targetValue = scriptProperties.nightValue;
    } else if (currentState === 'automatic') {
        targetValue = isDayTime() ? scriptProperties.dayValue : scriptProperties.nightValue;
    }

    // Smooth transition
    currentValue = lerp(currentValue, targetValue, scriptProperties.transitionSpeed * engine.frametime);

    // Save the value to the shared value
    shared[scriptProperties.sharedValueName] = currentValue;

    return currentValue;
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
