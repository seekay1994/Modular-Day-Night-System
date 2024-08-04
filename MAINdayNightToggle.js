'use strict';

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
    shared.currentState = states[currentStateIndex];
}

export function cursorClick(event) {
    // Update the state index to the next state
    currentStateIndex = (currentStateIndex + 1) % states.length;
    
    // Get the texture animation and set the frame
    let anim = thisLayer.getTextureAnimation();
    anim.setFrame(currentStateIndex);
    
    // Update the shared state value
    shared.currentState = states[currentStateIndex];

    // Save the current state to local storage
    localStorage.set('currentTimeState', states[currentStateIndex]);
}