'use strict';

export var scriptProperties = createScriptProperties()
    .addColor({ name: 'dayColor',           label: 'Day Color',         value: new Vec3(1, 1, 1)})
    .addColor({ name: 'nightColor',         label: 'Night Color',       value: new Vec3(0, 0, 0)})
    .addSlider({name: 'transitionSpeed',    label: 'Transition Speed',  value: 5,   min: 1,     max: 10,    integer: false})
.finish();

let smoothColor;
let transitionSpeed;

export function init() {
    smoothColor = scriptProperties.dayColor;
    transitionSpeed = scriptProperties.transitionSpeed;
}

export function update() {
    let currentState = shared.currentTODState;
    let newColor;

    if (currentState === 'day') {
        newColor = scriptProperties.dayColor;
    } else if (currentState === 'night') {
        newColor = scriptProperties.nightColor;
    }

    smoothColor = smoothColor.mix(newColor, Math.min(1.0, engine.frametime * transitionSpeed));

    return smoothColor;
}