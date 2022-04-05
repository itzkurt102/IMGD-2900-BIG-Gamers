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

var G = {

    //Game variables and constants
    level1Map: [['g','o','n','e',0],
                ['u','p','o','n',0],
                ['e','r','o','d','e'],
                ['s','a','n','e','r'],
                ['t','h','e','r','e']],

    level2Map: [
        [0,0,0,0,0,0,0,0,0,0,'p',0],
        [0,0,'c',0,0,0,0,0,'b','o','a','t'],
        [0,0,'o','c','e','a','n',0,0,0,'l',0],
        ['b',0,'c',0,0,0,0,'s','w','i','m',0],
        ['e',0,'o',0,0,'s','e','a',0,0,0,0],
        ['a',0,'n',0,0,'h',0,'n',0,0,0,0],
        ['c','r','u','i','s','e',0,'d',0,0,0,0],
        ['h',0,'t',0,0,'l',0,0,0,0,0,0],
        [0,0,0,0,0,'l',0,0,0,0,0,0],
                ],
    levelSolution: {},
    currWordSolution: [],
    blankGridColor: 0x014040,
    blankUnwritableGridColor: 0x011F20,
    highlightColor: 0x038F85,
    fullWrongColor: 0xC5243D,
    halfWrongColor: 0xFFAF1C,
    correctColor: 0x84FB91,
    currDirection: "H", //H or V for horizontal or vertical
    currPuzzleW: 0,
    currPuzzleH: 0,
    currWordStartCoord: [0,0],
    currWordDir: "H",


    //Loads the main menu
    loadMenu: function() {

    },

    isCharacterALetter: function(char) {
        return (/[a-zA-Z]/).test(char)
    },

    //Switches active direction for future balls
    loadLevel: function (levelNum) {
        //Reset everything
        PS.borderColor(PS.ALL, PS.ALL, G.blankUnwritableGridColor);
        PS.radius(PS.ALL, PS.ALL, 5);
        G.levelSolution = {};


        var width = G.level2Map[0].length;
        G.currPuzzleW = width;
        var height = G.level2Map.length;
        G.currPuzzleH = height;

        //Set up grid:
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                if(G.isCharacterALetter(G.level2Map[y][x])) {
                    //If it is a letter, write it to the solution hashtable
                    var key = [x, y].join('|');
                    G.levelSolution[key] = G.level2Map[y][x];

                    //and set it to writable spot color
                    PS.color(x, y, G.blankGridColor);

                }
                else {
                    PS.color(x, y, G.blankUnwritableGridColor);
                }

            }
        }

    },

    resetHighlights: function() {
        var width = G.level2Map[0].length;
        var height = G.level2Map.length;

        //Reset grid colors:
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                if(G.isCharacterALetter(G.level2Map[y][x])) {
                    PS.color(x, y, G.blankGridColor);
                }
                else {
                    PS.color(x, y, G.blankUnwritableGridColor);
                }
            }
        }
    },

    //Highlights where the player's guess will be input
    highlightGuessLoc: function(x, y) {
        G.resetHighlights();
        var coordsToHighlight = [];

        //Save direction before it is swapped
        G.currWordDir = G.currDirection;

        //PS.debug(x + " " + y + " key: " + G.levelSolution[[x, y].join('|')])

        //If it is a letter with a spot,
        if(G.levelSolution[[x, y].join('|')] != null) {

            G.currWordSolution = [G.levelSolution[[x, y].join('|')]]
            coordsToHighlight.push([x, y]);


            if(G.currDirection == "H") {
                //Look left and right, adding any beads with letters to the highlight and stopping at anything else

                //Left
                for(var l = x-1; l > -1; l--) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[l, y].join('|')] == null) {
                        break;
                    }

                    //Add this letter to the current word solution and to the highlight coords
                    G.currWordSolution.unshift(G.levelSolution[[l, y].join('|')]);
                    coordsToHighlight.unshift([l,y]);

                }

                //Right
                for(var r = x+1; r < G.currPuzzleW; r++) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[r, y].join('|')] == null) {
                        break;
                    }
                    //Add this letter to the current word solution and to the highlight coords
                    G.currWordSolution.push(G.levelSolution[[r, y].join('|')]);
                    coordsToHighlight.push([r,y]);
                }

                //Swap direction after we are done
                G.currDirection = "V";
            }
            else if(G.currDirection == "V") {
                //Look up and down, adding any beads with letters to the highlight and stopping at anything else

                //Down
                for(var d = y-1; d > -1; d--) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[x, d].join('|')] == null) {
                        break;
                    }

                    //Add this letter to the current word solution and to the highlight coords
                    G.currWordSolution.unshift(G.levelSolution[[x, d].join('|')]);
                    coordsToHighlight.unshift([x,d]);

                }

                //Right
                for(var u = y+1; u < G.currPuzzleH; u++) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[x, u].join('|')] == null) {
                        break;
                    }
                    //Add this letter to the current word solution and to the highlight coords
                    G.currWordSolution.push(G.levelSolution[[x, u].join('|')]);
                    coordsToHighlight.push([x,u]);
                }

                //Swap direction
                G.currDirection = "H";
            }

        }

        //Save the location of the first word
        G.currWordStartCoord = [coordsToHighlight[0][0], coordsToHighlight[0][1]];

        //Highlight full word spot
        for(var i=0; i < coordsToHighlight.length; i++) {
            PS.color(coordsToHighlight[i][0], coordsToHighlight[i][1], G.highlightColor);
        }

    },

    //Is run after new player input
    guess : function(text) {

        //Reset the direction of highlighting so the user can click just click to guess again
        if(G.currDirection === "H") {
            G.currDirection = "V";
        }
        else {
            G.currDirection = "H";
        }

        var correctLength = G.currWordSolution.length;
        //Check word length
        if(text.length !== correctLength) {
            PS.statusText("Incorrect length: should be " + correctLength + " letters long.");
            return;
        }

        //TODO Check if valid word
        if(false) {
            PS.statusText("Not a valid word: try again!");
            return;
        }

        //Go through each character of guess
        for(var g=0; g < correctLength; g++) {
            var char = text[g];
            var status = -1; //-1 if not in word, 0 if in word wrong place, 1 if correct place

            //Check the solution to see if it is in both the guess and correct word
            for(var s=0; s < correctLength; s++) {
                if(char === G.currWordSolution[s]) {
                    //If both letters are in the same spot, we have a correct match and we can break out
                    if(g === s) {
                        status = 1;
                        break;
                    }
                    else {
                        //Else, the letter is somewhere in the word, but keep going to check for exact match
                        status = 0;
                    }
                }
            }

            //Gets location of letter
            var x, y;
            if(G.currWordDir == "H") {
                x = G.currWordStartCoord[0] + g;
                y = G.currWordStartCoord[1];
            }
            else if(G.currWordDir == "V") {
                x = G.currWordStartCoord[0];
                y = G.currWordStartCoord[1] + g;
            }

            //We have determined the status of the letter now, so we will assign it the correct color
            switch(status) {
                case -1:
                    PS.glyphColor(x, y, G.fullWrongColor);
                    break;
                case 0:
                    PS.glyphColor(x, y, G.halfWrongColor);
                    break;
                case 1:
                    PS.glyphColor(x, y, G.correctColor);
                    break;
            }

            //And the correct glyph
            PS.glyph(x, y, char);



        }


    },



}



/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

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

	PS.gridSize( 12, 9 );

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

    PS.gridColor(0xF2EFC2);
	PS.statusText( "Game" );
    G.loadLevel(1);

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
    G.highlightGuessLoc(x, y);

    if(G.levelSolution[[x, y].join('|')] == null) {
        PS.statusText("Not a valid guess location, click elsewhere!");
    }
    else {
        PS.statusText("Click on a word spot to guess!");
        PS.statusInput("Guess Word ("+G.currWordSolution.length+"):", function(text) {
            G.guess(text);
        });
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

