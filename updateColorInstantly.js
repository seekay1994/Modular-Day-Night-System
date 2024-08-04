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

    // Save the color to the shared value
    shared[scriptProperties.sharedValueName] = newColor;

    return newColor;
}