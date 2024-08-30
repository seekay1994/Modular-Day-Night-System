'use strict';

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

export function init(value) {
    // Initialize currentValue based on initial state
    let initialState = shared.currentTODState;
    if (initialState === 'day') {
        currentValue = scriptProperties.dayValue;
    } else if (initialState === 'night') {
        currentValue = scriptProperties.nightValue;
    }
}

export function update(value) {
    let currentState = shared.currentTODState;
    let targetValue;

    if (currentState === 'day') {
        targetValue = scriptProperties.dayValue;
    } else if (currentState === 'night') {
        targetValue = scriptProperties.nightValue;
    }

    // Smooth transition
    currentValue = lerp(currentValue, targetValue, scriptProperties.transitionSpeed * engine.frametime);

    return currentValue;
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
