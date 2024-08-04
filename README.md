Sprite sheet:

256*256
3 Frames
[any] Duration

SETUP:

Import "dayNightToggle" texture as a sprite sheet with the values listed above.
Tie "dayNightToggle" script to that layers visibility-toggle.

Thats literally it.

Now you can use the scripts in the "Updaters" folder that check what state the toggle is currently in 
and applies the value/text/color/visibility that is being defined in the "update" scripts properties.

Most "update" scripts also output their result as a shared value that can then be applied to other objects using the "recieveUpdate" script.
This allows you to use the same color on multiple objects without having to do the math for each layer.

INFO:

Toggle: 
It has 3 states 'day', 'night' and 'automatic'. 
When you click the toggle texture it will switch to the next state, 
update the texture and send a shared value, corresponding to the current state.

The last active state is also saved to local storage to ensure that the wallpaper will not reset on restart.

Updaters:
These will check for the shared values from the toggle and then change objects depending on those 3 states.

Automatic - Automatically switches from day (starting 6:36) to night (starting 21:00).
Day - Always day
Night - Always night


// Function to determine if it is day or night based on the current time
function isDayTime() {
    let currentTime = engine.timeOfDay;
    return currentTime >= 0.275 && currentTime < 0.875;
}

0.275 = 6:36
0.875 = 21:00

if you want day to start at 8:00 (AM) then you have to do some math to improve script execution time.

8/24 = 0.333333...

So you need to replace the '0.275' with '0.333' to have day start at 8:00 (AM).
