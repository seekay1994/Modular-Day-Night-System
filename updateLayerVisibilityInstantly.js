'use strict';

// I would tie this to the layer visibility but that is currently not possible while uploading an asset pack.
// You can still use it on the layer visibility, as this does not happen with wallpapers. Only asset packs.

export function update() {
    let currentState = shared.currentTODState;

    if (currentState === 'day') {
        thisLayer.visible = true;
    } else if (currentState === 'night') {
        thisLayer.visible = false;
    }
}