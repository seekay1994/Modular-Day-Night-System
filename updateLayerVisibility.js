'use strict';

// This script needs to be tied to a layers opacity to function as intended.

import * as WEMath from 'WEMath';

export var scriptProperties = createScriptProperties()
    .addSlider({name: 'fadeSpeed',  label: 'Fade Speed',    value: 1,   min: 0.1,   max: 5, integer: false})
.finish();

const minValue = 0;
const maxValue = 1;
let currentValue = 0;
let targetValue = 0;
let visibleState = false;

export function init() {
    const minValue = 0;
    const maxValue = 1;
    const currentState = shared.currentTODState;

    if (currentState === 'day') {
        thisLayer.visible = true;
        currentValue = maxValue;
        visibleState = true;
        targetValue = maxValue;
    } else if (currentState === 'night') {
        thisLayer.visible = false;
        currentValue = minValue;
        visibleState = false;
        targetValue = minValue;
    }

    return currentValue;
}



export function update() {
    const fadeSpeed = scriptProperties.fadeSpeed * engine.frametime;
    const currentState = shared.currentTODState;

    if (currentState === 'day') {
        if (!visibleState) {
            thisLayer.visible = true;
            visibleState = true;
        }
        targetValue = maxValue;
    } else if (currentState === 'night') {
        targetValue = minValue;
    }

    currentValue = WEMath.mix(currentValue, targetValue, fadeSpeed);

    if (currentState === 'night' && Math.abs(currentValue - minValue) < 0.01) {
        thisLayer.visible = false;
        visibleState = false;
    }

    return currentValue;
}