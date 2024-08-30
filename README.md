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

INFO:

Toggle: 
It has 3 states 'day', 'night' and 'automatic'. 
When you click the toggle texture it will switch to the next state, 
update the texture and send a shared value, corresponding to the current state.

The last active state is also saved to local storage to ensure that the wallpaper will not reset on restart.

Updaters:
These will check for the shared values from the toggle and then change objects depending on those 3 states.

Automatic - Automatically switches from day (starting 8) to night (starting 20:00).
Day - Always day
Night - Always night
