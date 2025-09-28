'use strict';

export var scriptProperties = createScriptProperties()
    .addText({name: 'dayText',      label: 'Day Text',      value: 'Good day!'})
    .addText({name: 'nightText',    label: 'Night Text',    value: 'Good night!'})
.finish();

export function update() {
    let currentState = shared.currentTODState;
    let newText;

    if (currentState === 'day') {
        newText = scriptProperties.dayText;
    } else if (currentState === 'night') {
        newText = scriptProperties.nightText;
    }

    return newText;
}