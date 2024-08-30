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
    .finish();

let targetColor;
let smoothColor;
let transitionSpeed;

export function init(value) {
    targetColor = scriptProperties.dayColor;
    smoothColor = scriptProperties.dayColor;
    transitionSpeed = scriptProperties.transitionSpeed;
}

export function update(value) {
    let currentState = shared.currentTODState;
    let newColor;

    if (currentState === 'day') {
        newColor = scriptProperties.dayColor;
    } else if (currentState === 'night') {
        newColor = scriptProperties.nightColor;
    }

    // Smooth transition
    smoothColor = smoothColor.mix(newColor, Math.min(1.0, engine.frametime * transitionSpeed));

    return smoothColor;
}
