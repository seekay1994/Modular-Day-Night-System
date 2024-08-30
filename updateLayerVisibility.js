'use strict';

export function update(value) {
    let currentState = shared.currentTODState;

    if (currentState === 'day') {
        thisLayer.visible = true;
    } else if (currentState === 'night') {
        thisLayer.visible = false;
    }
}
