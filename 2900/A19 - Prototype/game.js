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

    WALL_COLOR: PS.COLOR_GRAY,
    FLOOR_COLOR: PS.COLOR_GRAY_LIGHT,
    PLAYER_COLOR: PS.COLOR_CYAN,
    ENTRANCE_COLOR: PS.COLOR_WHITE,
    DIMENSION: 15,
    playerSprite: "",
    playerPos: [0,0],
    activeLevel: 0,
    activeSubLevel: 0,

    loadMap: function(map) {
        for(var x = 0; x < G.DIMENSION; x++) {
            for (var y = 0; y < G.DIMENSION; y++) {
                //Go through the whole map
                switch(map[y][x]) {
                    case 0:
                        //WALL
                        PS.color(x, y, G.WALL_COLOR);
                        break;

                    case 1:
                        //FLOOR
                        PS.color(x, y, G.FLOOR_COLOR);
                        PS.data(x, y, 1);
                        break;
                    case 2:
                        //PLAYER
                        //Makes a sprite that will be the player sprite
                        var newSprite = PS.spriteSolid(1, 1);

                        //Set sprite properties
                        PS.spritePlane(newSprite, 1);
                        PS.spriteSolidColor(newSprite, G.PLAYER_COLOR);
                        PS.spriteMove(newSprite, x, y);

                        //Save information
                        G.playerSprite = newSprite;
                        G.playerPos = [x, y];

                        //Set the tile to a normal floor tile since the sprite is on top
                        PS.color(x, y, G.FLOOR_COLOR);
                        PS.data(x, y, 1);
                        break;
                    case 3:
                        //ENTRANCE
                        PS.color(x, y, G.ENTRANCE_COLOR);
                        PS.data(x, y, 3);
                        break;
                    case 4:
                        //LUMEN
                        PS.color(x, y, PS.COLOR_BLUE);
                        PS.data(x, y, 4);
                        break;
                }
            }
        }

    },


    loadLevel: function(level, subLevel) {
        //Default colors
        PS.alpha(PS.ALL, PS.ALL, 255);



        switch(level) {
            case 1:
                switch(subLevel) {
                    case 0:
                        //Level Map: (0=wall, 1=floor, 2=player, 3=entrance, 4=lumen)
                        var map = [
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.loadMap(map);
                        G.activeLevel = 1;
                        G.activeSubLevel = 0;

                        break;
                    case 1:

                        break;
                    case 2:
                        break;
                }
                break;

            case 2:
                switch(subLevel) {
                    case 0:
                        var map = [
                            [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.loadMap(map);
                        G.activeLevel = 2;
                        G.activeSubLevel = 0;
                        break;
                    case 1:
                        var map = [
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.loadMap(map);
                        G.activeLevel = 2;
                        G.activeSubLevel = 1;
                        break;
                    case 2:
                        break;
                }
                break;
        }
    },

    movePlayer: function(dx, dy) {
        //calculate new potential location
        var newX = G.playerPos[0] + dx;
        var newY = G.playerPos[1] + dy;

        //Check if out of bounds
        if(newX < 0 || newX > G.DIMENSION-1 || newY < 0 || newY > G.DIMENSION-1) {
            //If out of bounds, we don't move anything
            return;
        }

        //Handle according to what the new location is
        switch(PS.data(newX, newY)) {
            case 0:
                //WALL - Can't move!
                return;

            case 1:
                //FLOOR - Valid move!
                G.playerPos = [newX, newY];
                PS.spriteMove(G.playerSprite, newX, newY);
                break;

            case 3:
                //ENTRANCE - Need to move to new level

                if(G.activeSubLevel === 0) {
                    //If in the main "hub" level, entrances follow these rules:
                    if(newY === 7) {
                        //If y is in the middle of the level, we know it is going to next level
                        //So we need to clean up player sprite and load next level
                        PS.spriteDelete(G.playerSprite);
                        G.loadLevel(G.activeLevel + 1, 0);

                    }
                    else if(newY < 7) {
                        //If it is above the middle, it is going to sublevel 1
                        //So we need to clean up player sprite and load next sublevel
                        PS.spriteDelete(G.playerSprite);
                        G.loadLevel(G.activeLevel, 1);
                    }
                    else if(newY > 7) {
                        //If it is below the middle, it is going to sublevel 2
                        //So we need to clean up player sprite and load next sublevel
                        PS.spriteDelete(G.playerSprite);
                        G.loadLevel(G.activeLevel, 2);
                    }
                }
                else {
                    //If NOT in the main "hub" level, all entrances lead back to main level
                    //So we need to clean up player sprite and load main level
                    PS.spriteDelete(G.playerSprite);
                    G.loadLevel(G.activeLevel, 0);
                }

                break;

            case 4:
                //LUMEN - Need to handle properly
                break;
        }



    }

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
	PS.gridSize(15, 15);
	PS.statusText( "Tunnel Vision" );
    PS.gridColor(G.WALL_COLOR);
    G.loadLevel(1, 0);
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

    switch(key) {
        case 119:
            //W - we handle same as up arrow, so no break
        case PS.KEY_ARROW_UP:
            G.movePlayer(0, -1);
            break;

        case 97:
            //A - we handle same as left arrow, so no break
        case PS.KEY_ARROW_LEFT:
            G.movePlayer(-1, 0);
            break;

        case 115:
            //S - we handle same as down arrow, so no break
        case PS.KEY_ARROW_DOWN:
            G.movePlayer(0, 1);
            break;

        case 100:
            //D - we handle same as right arrow, so no break
        case PS.KEY_ARROW_RIGHT:
            G.movePlayer(1, 0);
            break;
    }
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

PS.input = function( sensors, options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

PS.touch = function( x, y, data, options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

PS.release = function( x, y, data, options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

PS.enter = function( x, y, data, options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

PS.exit = function( x, y, data, options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

PS.exitGrid = function( options ) {
    //NOT USED - KEYBOARD INPUT ONLY
};

