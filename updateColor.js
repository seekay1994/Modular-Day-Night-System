'use strict';

import * as WEColor from 'WEColor';

// Customizable colors
export var scriptProperties = createScriptProperties()
    .addColor({
        name: 'dayColor',
        label: 'Day Color',
        value: new Vec3(1, 1, 1) // Default white color
    })
    .addColor({
        name: 'nightColor',
        label: 'Night Color',
        value: new Vec3(0, 0, 0) // Default black color
    })
    .addSlider({
        name: 'transitionSpeed',
        label: 'Transition Speed',
        value: 5,
        min: 1,
        max: 10,
        integer: false
    })
    .addText({
        name: 'sharedValueName',
        label: 'Shared Value Name',
        value: 'sharedColor'
    })
    .finish();

// Function to determine if it is day or night based on the current time
function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= 0.275 && currentTime < 0.875;
}

let targetColor;
let smoothColor;
let transitionSpeed;

export function init(value) {
    targetColor = scriptProperties.dayColor;
    smoothColor = scriptProperties.dayColor;
    transitionSpeed = scriptProperties.transitionSpeed;
}

export function update(value) {
    let currentState = shared.currentState;
    let newColor;

    if (currentState === 'day') {
        newColor = scriptProperties.dayColor;
    } else if (currentState === 'night') {
        newColor = scriptProperties.nightColor;
    } else if (currentState === 'automatic') {
        newColor = isDayTime() ? scriptProperties.dayColor : scriptProperties.nightColor;
    }

    // Smooth transition
    smoothColor = smoothColor.mix(newColor, Math.min(1.0, engine.frametime * transitionSpeed));

    // Save the color to the shared value
    shared[scriptProperties.sharedValueName] = smoothColor;

    return smoothColor;
}
