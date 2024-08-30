'use strict';

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
    .finish();


export function update(value) {
    let currentState = shared.currentTODState;
    let newColor;

    if (currentState === 'day') {
        newColor = scriptProperties.dayColor;
    } else if (currentState === 'night') {
        newColor = scriptProperties.nightColor;
    }

    return newColor;
}
