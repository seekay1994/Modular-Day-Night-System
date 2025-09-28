'use strict';

export var scriptProperties = createScriptProperties()
    .addSlider({name: 'dayValue',   label: 'Day Value',     value: 0.8, min: 0, max: 1, integer: false})
    .addSlider({name: 'nightValue', label: 'Night Value',   value: 0.2, min: 0, max: 1, integer: false})
.finish();

export function update() {
    let currentState = shared.currentTODState;
    let newValue;

    if (currentState === 'day') {
        newValue = scriptProperties.dayValue;
    } else if (currentState === 'night') {
        newValue = scriptProperties.nightValue;
    }

    return newValue;
}