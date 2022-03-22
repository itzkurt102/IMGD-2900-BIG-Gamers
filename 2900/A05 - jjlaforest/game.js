/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

// Jadon Laforest
// Team BIG Gamers
// Mod 1: 32 "Levels" that now require you to click every bead, starting with a 2x2 and ending with 32x32
// Mod 2: Updating Status Display that shows you how many beads left
// Mod 3: Beads are set to a random color upon touch, and reset to white when touched again
// Mod 4: Plays a "victory" sound once you complete the level
// Mod 5: Sets the background of each new level to a random dark color.
// Mod 6: Changed the fill (click) noise
// Mod 7: Added a noise when un-filling a bead
// Mod 8: Changed the noise when filling a bead
// Mod 9: Added a victory noise once completing level 32 (and then it resets to the first level) - Hard to manually achieve
// Mod 10: Plays a sound when you start the next level

"use strict"; // Do NOT remove this directive!

var G = ( function() {
	var cur_grid_size = -1; //current size of the grid
	var total_beads = -1; //total beads that are in the grid
	var filled_beads = -1;
	var checked = false;

	var exports = {

		//G.newLevel goes to new level specified
		newLevel : function(level) {
			//reset variables
			filled_beads = 0;
			cur_grid_size = level;
			total_beads = cur_grid_size * cur_grid_size;

			PS.gridSize(cur_grid_size, cur_grid_size);
			PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
			PS.data(PS.ALL, PS.ALL, PS.COLOR_WHITE);
			var rand_bg = [PS.random(30), PS.random(30), PS.random(30)];
			PS.gridColor( rand_bg );
			PS.statusColor( PS.COLOR_WHITE );
			PS.statusText( "Fill all the beads!");
		},

		//G.checkFilled() checks to see if the board is completely filled
		checkFilled : function() {
			if(filled_beads === total_beads) {
				if(!checked) {
					PS.statusText("Level Complete! Click to Continue!");
					PS.audioPlay( "fx_powerup6" );
					checked = true;
				}
				else {
					PS.audioPlay( "fx_coin1" );
					checked = false;
				}
				return true;
			}
			else {
				PS.statusText("Level " + (cur_grid_size - 1) + ": " + (total_beads - filled_beads) + " Beads Left!" );
				return false;
			}
		},

		get_filled : function() {
			return filled_beads;
		},

		set_filled : function(new_value) {
			filled_beads = new_value;
		},
		//get_cheat : function() {
		//	return total_beads;
		//}

	};

	return exports;
} () );


PS.init = function( system, options ) {
	// Establish grid dimensions

	//PS.gridSize( 7, 7 );

	// Set background color to Perlenspiel logo gray

	//PS.gridColor( 0x303030 );

	// Change status line color and text

	//PS.statusColor( PS.COLOR_WHITE );
	//PS.statusText( "Touch any bead" );
	G.newLevel(2);

	// Preload click sound

	PS.audioLoad( "fx_pop" );
	PS.audioLoad("fx_powerup6");
	PS.audioLoad("fx_coin1");
	PS.audioLoad("fx_shoot7");
	PS.audioLoad("fx_tada");

};

PS.touch = function( x, y, data, options ) {
	if(G.checkFilled()) {
		if(Math.sqrt(G.get_filled()) === 32) { //If this is the last level
			PS.audioPlay("fx_tada");

			//reset to starting level
			G.newLevel(2);
		}
		else {
			//If not last level, set to next level
			G.newLevel(Math.sqrt(G.get_filled())+1);
		}
	}
	else {
		if(data === 0 || data === PS.COLOR_WHITE) {
			var rand_color = [PS.random(255), PS.random(255), PS.random(255)];

			PS.color( x, y, rand_color ); // set color to current value of data
			PS.data(x, y, rand_color);
			G.set_filled(G.get_filled() + 1);
			//G.set_filled(G.get_cheat());
			G.checkFilled();
			PS.audioPlay( "fx_pop" );

		}
		else {
			PS.color( x, y, PS.COLOR_WHITE ); // set color to current value of data
			PS.data(x, y, PS.COLOR_WHITE);
			G.set_filled(G.get_filled() - 1);
			G.checkFilled();
			PS.audioPlay( "fx_shoot7" );
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

