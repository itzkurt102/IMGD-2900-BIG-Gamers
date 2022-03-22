/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

// Kurtis Kiai
// Team BIG Gamers
// Mod 1: Changed size of grid to 10 x 10
// Mod 2: Changed grid background color to 'almost-black' black
// Mod 3: Changed status line color to cyan
// Mod 4: Status line changes with every palette
// Mod 5: Changed beads to have space between them
// Mod 6: Added different sounds depending on different palettes


"use strict"; // Do NOT remove this directive!

PS.init = function( system, options ) {
    PS.gridSize( 10, 10 ); //New grid size

    PS.scale( PS.ALL, PS.ALL, 95 ); // Give a bit of space between the beads

    // After this statusText call, we will randomly display an area with its corresponding color palette.
    PS.statusText( "Touch a bead to view the world in colors." );

    //The following color changes are just for readability.
    PS.statusColor({rgb : 0x09FFE9} ); // Cyan color
    PS.gridColor( { rgb : 0x202020 } ); // Black (not really)

    // Load some sounds
    PS.audioLoad ( "fx_blip" );
    PS.audioLoad ( "fx_bloop" );
    PS.audioLoad ( "fx_pop" );
    PS.audioLoad ( "fx_bloink" );
};

PS.touch = function( x, y, data, options ) {
    var  x, y, r, g, b;

    const randomSelector = PS.random(4); // This random number will determine the location

    // Switch to determine the color palette and sounds.
    switch (randomSelector){
        case 1 :
            PS.statusText ( "Welcome to Italy." );
            PS.statusColor ( 0xD6221A );
            PS.audioPlay( "fx_blip" );
            for ( y = 0; y < 10; y += 1 ) {
                for ( x = 0; x < 10; x += 1 ) {
                    r = PS.random(100) + 100; // random red 100 - 200
                    g = PS.random(80) + 100; // random green 100 - 180
                    b = PS.random(40) + 100; // random blue 100 - 140
                    PS.color( x, y, r, g, b ); // set bead color
                }
            };
            break;

        case 2 :
            PS.statusText ( "Welcome to Japan." );
            PS.statusColor ( 0xFFE9CA );
            PS.audioPlay( "fx_bloop" );
            for ( y = 0; y < 10; y += 1 ) {
                for ( x = 0; x < 10; x += 1 ) {
                    r = PS.random(56) + 200; // random red 200-256
                    g = PS.random(80) + 130; // random green 130 - 210
                    b = PS.random(80) + 50; // random blue 50 - 130
                    PS.color( x, y, r, g, b ); // set bead color
                }
            };
            break;

        case 3 :
            PS.statusText ( "Welcome to Kenya." );
            PS.statusColor ( 0xF29F05 );
            PS.audioPlay( "fx_pop" );
            for ( y = 0; y < 10; y += 1 ) {
                for ( x = 0; x < 10; x += 1 ) {
                    r = PS.random(80) + 140; // random red 140 - 220
                    g = PS.random(60) + 150; // random green 150 - 210
                    b = PS.random(5); // random blue 0 - 5
                    PS.color( x, y, r, g, b ); // set bead color
                }
            };
            break;

        case 4:
            PS.statusText ( "Welcome to Switzerland." );
            PS.statusColor ( 0xDCDFE5 );
            PS.audioPlay( "fx_bloink" );
            for ( y = 0; y < 10; y += 1 ) {
                for ( x = 0; x < 10; x += 1 ) {
                    r = PS.random(140) + 70; // random red 70 - 210
                    g = PS.random(110) + 90; // random green 90 - 200
                    b = PS.random(130) + 100; // random blue 100 - 230
                    PS.color( x, y, r, g, b ); // set bead color
                }
            };
            break;

    }


    if (randomSelector == 1){

        PS.statusText ( "Welcome to Rome." );
        // Nested loops set the bead colors

        for ( y = 0; y < 10; y += 1 ) {
            for ( x = 0; x < 10; x += 1 ) {
                r = PS.random(256) - 1; // random red 0-255
                g = PS.random(256) - 1; // random green
                b = PS.random(256) - 1; // random blue
                PS.color( x, y, r, g, b ); // set bead color
            }
        }

    }


};
/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

