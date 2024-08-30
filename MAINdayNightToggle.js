'use strict';

export var scriptProperties = createScriptProperties()

    .addSlider({
        name: 'dayStart',
        label: 'Day Start',
        value: 8,
        min: 0,
        max: 24,
        integer: true
    })
    .addSlider({
        name: 'nightStart',
        label: 'Night Start',
        value: 20,
        min: 0,
        max: 24,
        integer: true
    })
    .finish();

// Define the sprite sheet states
const states = ['automatic', 'day', 'night'];
let currentStateIndex = 0;

export function init() {
    // Load the state from local storage
    let savedState = localStorage.get('currentTimeState');
    if (savedState !== null && states.includes(savedState)) {
        currentStateIndex = states.indexOf(savedState);
    }

    // Pause the texture animation
    let anim = thisLayer.getTextureAnimation();
    anim.pause();
    
    // Set the initial frame
    anim.setFrame(currentStateIndex);
    
    // Set the initial shared state
    shared.currentTODState = getSharedState();
}

export function cursorClick(event) {
    // Update the state index to the next state
    currentStateIndex = (currentStateIndex + 1) % states.length;
    
    // Get the texture animation and set the frame
    let anim = thisLayer.getTextureAnimation();
    anim.setFrame(currentStateIndex);
    
    // Update the shared state value
    shared.currentTODState = getSharedState();

    // Save the current state to local storage
    localStorage.set('currentTimeState', states[currentStateIndex]);
}

function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= (scriptProperties.dayStart / 24) && currentTime < (scriptProperties.nightStart / 24);
}

function getSharedState() {
    if (states[currentStateIndex] === 'automatic') {
        return isDayTime() ? 'day' : 'night';
    } else {
        return states[currentStateIndex];
    }
}
