/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

var G = {

    FRAME_RATE: 3,
    GRID_WIDTH: 20,
    GRID_HEIGHT: 20,
    sprites: [],
    spriteDir: [],
    spriteCol: [],
    spriteLoc: [],
    spriteActive: [],

    collide : function(s1, p1, s2, p2, type) {
        if(type === PS.SPRITE_OVERLAP) {
            //Deal with collision
            var i = G.sprites.indexOf(s1);
            var j = G.sprites.indexOf(s2);

            //If both of the sprites included in the collision are currently active AND the collision is on plane 1
            if(G.spriteActive[i] && G.spriteActive[j] && p1 === 1 && p2 === 1) {
                //Deactivating first sprite
                G.spriteActive[i] = false;
                PS.spritePlane(s1, 0);
                PS.spriteShow(s1, false);

                var color1 = G.spriteCol[i];
                var color2 = G.spriteCol[j];
                var combColor = [(color1[0]+color2[0])/2, (color1[1]+color2[1])/2, (color1[2]+color2[2])/2];

                PS.spriteSolidColor(s2, combColor);


            }

        }

    },

    tick : function() {
        "use strict";
        var len, i, x, y, dx, dy, ballCount;

        len = G.sprites.length; // number of active beads

        ballCount = 0;
        i = 0;
        while (i < len) {
            if(G.spriteActive[i]) {
                //Grabbing the information we need
                x = G.spriteLoc[i][0];
                y = G.spriteLoc[i][1];
                dx = G.spriteDir[i][0];
                dy = G.spriteDir[i][1];

                //setting new x and y values according to direction
                x += dx;
                y += dy;


                //check if out of bounds. If so, make it stay in bounds and reverse direction
                if(x < 1) {
                    x = 1;
                    G.spriteDir[i][0] = dx * -1; //reverse dx
                }
                else if(x > G.GRID_WIDTH - 2) {
                    x = G.GRID_WIDTH - 2;
                    G.spriteDir[i][0] = dx * -1; //reverse dx
                }

                if(y < 1) {
                    y = 1;
                    G.spriteDir[i][1] = dy * -1; //reverse dy
                }
                else if(y > G.GRID_HEIGHT - 2) {
                    y = G.GRID_HEIGHT - 2;
                    G.spriteDir[i][1] = dy * -1; //reverse dy
                }


                PS.spriteMove(G.sprites[i], x, y);
                G.spriteLoc[i] = [x, y];
                ballCount += 1;
            }
            i += 1;
        }

        if(ballCount == 0) {
            PS.statusText("Click!");
        }
        else {
            PS.statusText("Ball Count: " + ballCount);
        }

    },
}



PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize( 20, 20 );

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	PS.statusText( "Click!" );

    PS.timerStart( G.FRAME_RATE, G.tick );

    PS.radius(PS.ALL, PS.ALL, 50);
    PS.border(PS.ALL, PS.ALL, 0);
    PS.color(PS.ALL, PS.ALL, 0x9C9C9C);

    //Wall Creation
    var COLOR_WALL = PS.COLOR_BLACK; // wall color
    PS.color( PS.ALL, 0, COLOR_WALL );
    PS.color( PS.ALL, G.GRID_HEIGHT - 1, COLOR_WALL );
    PS.color( 0, PS.ALL, COLOR_WALL );
    PS.color( G.GRID_WIDTH - 1, PS.ALL, COLOR_WALL );

    PS.gridColor(0x9C9C9C)



	// Add any other initialization code you need here.
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {

    //Don't let them create
    if(x == 0 || x == G.GRID_WIDTH-1 || y == 0 || y == G.GRID_HEIGHT-1) {
        return;
    }


    //Create sprite at the location and set to a random color
    var newSprite;

    newSprite = PS.spriteSolid(1, 1);


    var rand_color = [PS.random(255), PS.random(255), PS.random(255)];

    PS.spriteSolidColor(newSprite, rand_color);
    PS.spriteMove(newSprite, x, y);
    PS.spriteCollide(newSprite, G.collide);
    PS.spritePlane(newSprite, 1);

    G.sprites.push(newSprite);
    G.spriteCol.push(rand_color);
    G.spriteLoc.push([x,y]);
    G.spriteActive.push(true);


    //Move in a random direction
    var dx = (PS.random(1000) % 3) - 1; //randomly generated dx -1, 0, 1
    var dy = (PS.random(1000) % 3) - 1; //randomly generated dy -1, 0, 1

    //if not moving in any direction, just move it!
    if(dx == 0 && dy == 0) {
        dx = 1;
    }

    G.spriteDir.push([dx, dy]);



	// Add code here for mouse clicks/touches
	// over a bead.
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

