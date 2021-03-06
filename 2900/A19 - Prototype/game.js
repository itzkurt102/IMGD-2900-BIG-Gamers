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

    WALL_COLOR: PS.COLOR_BLACK,
    FLOOR_COLOR: PS.COLOR_GRAY_LIGHT,
    PLAYER_COLOR: PS.COLOR_CYAN,
    ENTRANCE_COLOR: PS.COLOR_GREEN,
    DIMENSION: 15,
    playerSprite: "",
    playerPos: [0,0],
    activeLevel: 0,
    activeSubLevel: 0,
    spotLighted: [],
    lumenCounter: 0,
    currentStatusLine: "",

    loadMap: function(map) {
        PS.data(PS.ALL, PS.ALL, 0);
        PS.radius(PS.ALL, PS.ALL, PS.DEFAULT);
        PS.scale(PS.ALL, PS.ALL, PS.DEFAULT);
        PS.bgColor(PS.ALL, PS.ALL, PS.DEFAULT);
        PS.bgAlpha(PS.ALL, PS.ALL, PS.DEFAULT);
        G.spotLighted = [];

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
                        G.spotLighted.push([x,y]);
                        break;
                    case 4:
                        //LUMEN

                        PS.color(x, y, PS.COLOR_BLUE);
                        PS.data(x, y, 4);
                        PS.radius(x, y, 50);
                        PS.scale(x, y, 50);
                        PS.bgColor(x, y, G.FLOOR_COLOR);
                        PS.bgAlpha(x, y, 255);
                        G.spotLighted.push([x,y]);
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
                            [0,2,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        PS.statusText("WASD/Arrow Keys to move.");
                        G.loadMap(map);
                        G.activeLevel = 1;
                        G.activeSubLevel = 0;
                        break;
                    case 1:
                        //No sublevels
                        break;
                    case 2:
                        //No sublevels
                        break;
                }
                break;

            case 2:
                switch(subLevel) {
                    case 0:
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        PS.statusText("Maybe that does something...");
                        G.currentStatusLine =  "Maybe that does something...";
                        G.loadMap(map);
                        G.activeLevel = 2;
                        G.activeSubLevel = 0;
                        break;
                    case 1:
                        //No sublevels
                        break;
                    case 2:
                        //No sublevels
                        break;
                }
                break;

            case 3:
                switch(subLevel) {
                    case 0:
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.currentStatusLine = "Hmm...I wonder where that goes...";
                        G.newStatus();
                        G.loadMap(map);
                        G.activeLevel = 3;
                        G.activeSubLevel = 0;
                        break;
                    case 1:
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,0,1,1,4,0],
                            [0,1,0,0,0,0,0,0,0,1,1,1,0,0,0],
                            [0,1,1,1,0,1,1,1,0,0,0,0,0,0,0],
                            [0,1,0,1,1,1,0,1,1,1,1,1,1,0,0],
                            [0,0,0,0,0,0,0,0,0,0,1,0,1,0,0],
                            [0,1,1,1,1,1,1,1,1,0,1,0,1,0,0],
                            [0,1,0,0,0,0,0,0,1,0,1,0,1,1,0],
                            [0,1,0,1,1,1,1,0,1,0,1,0,0,1,0],
                            [0,1,0,1,0,0,1,0,1,0,1,1,0,1,0],
                            [0,1,0,1,1,0,1,0,1,0,0,1,0,1,0],
                            [0,1,0,0,1,0,1,0,1,1,1,1,0,1,0],
                            [0,1,0,0,1,0,1,0,1,0,0,0,0,1,0],
                            [0,1,1,1,1,0,1,0,1,1,1,1,1,1,0],
                            [0,0,0,0,0,0,3,0,0,0,0,0,0,0,0]];

                        G.currentStatusLine = "Well this is different...";
                        G.newStatus();
                        G.loadMap(map);
                        G.activeLevel = 3;
                        G.activeSubLevel = 1;
                        break;
                    case 2:
                        //No sublevels
                        break;
                }
                break;

            case 4:
                switch(subLevel) {
                    case 0:
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,1,1,1,1,1,0,3],
                            [0,0,0,0,0,0,0,1,0,0,0,0,1,1,1],
                            [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
                            [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.currentStatusLine = "Uhh...who turned out the lights?";
                        G.newStatus();
                        G.loadMap(map);
                        G.activeLevel = 4;
                        G.activeSubLevel = 0;
                        break;
                    case 1:
                        var map = [
                            [0,1,1,1,0,1,1,1,1,0,1,1,1,0,0],
                            [0,1,0,1,0,0,0,0,1,0,1,0,1,1,1],
                            [0,1,0,1,1,1,1,1,1,0,0,0,0,0,1],
                            [1,1,0,0,0,0,0,0,1,1,1,0,1,0,1],
                            [1,0,0,0,1,1,1,1,1,0,1,0,1,0,1],
                            [1,0,1,1,1,0,0,0,0,0,1,0,1,0,1],
                            [1,0,1,0,0,0,1,1,1,0,1,0,1,0,1],
                            [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
                            [1,0,1,0,1,0,0,0,1,0,1,1,1,1,1],
                            [1,0,1,0,1,0,1,1,1,0,0,1,0,0,0],
                            [1,0,1,0,1,0,0,0,0,0,1,1,1,1,1],
                            [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
                            [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
                            [1,1,1,1,1,1,1,1,4,0,1,0,1,0,1],
                            [0,0,0,0,0,0,0,0,0,0,1,1,1,0,3]];

                        G.loadMap(map);
                        G.activeLevel = 4;
                        G.activeSubLevel = 1;
                        break;
                    case 2:
                        var map = [
                            [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,0,1,1,1,1,1,1,0,1,1,1,1,0],
                            [0,1,0,1,0,0,1,0,1,0,1,0,0,1,0],
                            [0,1,0,1,1,0,1,0,1,0,1,0,1,1,0],
                            [0,1,0,0,1,0,1,0,1,1,1,0,1,0,0],
                            [0,1,1,1,1,0,1,0,0,0,0,0,1,0,0],
                            [0,0,0,0,0,0,1,0,1,1,1,0,1,0,0],
                            [0,1,1,1,1,1,1,0,1,0,1,0,1,4,0],
                            [0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],
                            [0,1,0,1,1,1,0,1,1,0,1,1,1,1,0],
                            [0,1,0,1,0,1,0,1,0,0,0,0,0,1,0],
                            [0,1,1,1,0,1,1,1,0,1,1,1,0,1,0],
                            [0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
                            [0,1,1,1,1,1,1,1,1,1,0,4,1,1,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.loadMap(map);
                        G.activeLevel = 4;
                        G.activeSubLevel = 2;
                        break;
                }
                break;

            case 5:
                switch(subLevel) {
                    case 0:
                        var map = [
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                            [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
                            [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
                            [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
                            [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
                            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
                            [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
                            [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
                            [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
                            [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
                            [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]];

                        if(G.lumenCounter === 0) {
                            G.currentStatusLine = "Well, you finished I guess...";
                        }
                        else if(G.lumenCounter > 0 && G.lumenCounter < 4) {
                            G.currentStatusLine = "Good Job. Thanks for playing!";
                        }
                        else if(G.lumenCounter === 5) {
                            G.currentStatusLine = "Great Job! Congrats collector!";
                        }
                        else if(G.lumenCounter > 5) {
                            G.currentStatusLine = "Hmm...Maybe we should fix that...";
                        }

                        G.newStatus();
                        G.loadMap(map);
                        G.activeLevel = 5;
                        G.activeSubLevel = 0;
                        break;
                    case 1:

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
                PS.audioPlay("fx_powerup5");

                if(G.activeSubLevel === 0) {
                    //If in the main "hub" level, entrances follow these rules:
                    if(newY === 7) {
                        //If y is in the middle of the level, we know it is going to next level
                        //So we need to clean up player sprite and load next level
                        newX = newX-12;
                        G.loadLevel(G.activeLevel + 1, 0);
                        G.playerPos = [newX, newY];
                        PS.spriteMove(G.playerSprite, newX, newY);
                    }
                    else if(newY < 7) {
                        //If it is above the middle, it is going to sublevel 1
                        //So we need to clean up player sprite and load next sublevel
                        newY = newY+12;
                        G.loadLevel(G.activeLevel, 1);
                        G.playerPos = [newX, newY];
                        PS.spriteMove(G.playerSprite, newX, newY);
                    }
                    else if(newY > 7) {
                        //If it is below the middle, it is going to sublevel 2
                        //So we need to clean up player sprite and load next sublevel
                        newY = newY-12;
                        G.loadLevel(G.activeLevel, 2);
                        G.playerPos = [newX, newY];
                        PS.spriteMove(G.playerSprite, newX, newY);
                    }
                }
                else {
                    //If NOT in the main "hub" level, all entrances lead back to main level
                    //So we need to clean up player sprite and load main level
                    if(G.activeSubLevel === 1) {
                        newY = newY-12;
                        G.loadLevel(G.activeLevel, 0);
                        G.playerPos = [newX, newY];
                        PS.spriteMove(G.playerSprite, newX, newY);
                    }
                    else if(G.activeSubLevel === 2) {
                        newY = newY+12;
                        G.loadLevel(G.activeLevel, 0);
                        G.playerPos = [newX, newY];
                        PS.spriteMove(G.playerSprite, newX, newY);
                    }

                }

                //If we are loading a new level, we just return as to not break anything else
                break;

            case 4:
                //LUMEN - Handle pickup and move to location
                G.lumenPickup(newX, newY);
                G.playerPos = [newX, newY];
                PS.spriteMove(G.playerSprite, newX, newY);
                break;
        }

        //Handle lighting:
        if(G.activeLevel === 4) {
            G.spotLight(newX, newY);
        }
        else if(G.activeLevel === 6 || G.activeLevel === 7) {
            //Different lighting
        }
        else if(G.activeLevel === 8 || G.activeLevel === 9) {
            //Different lighting
        }

    },

    spotLight: function(centerX, centerY) {
        PS.alpha(PS.ALL, PS.ALL, 0);

        //Spotlight the 9x9 space with x, y at center
        for(var x = centerX-1; x < centerX+2; x++) {
            for (var y = centerY-1; y < centerY+2; y++) {
                //Check if out of bounds
                if(x < 0 || x > G.DIMENSION-1 || y < 0 || y > G.DIMENSION-1) {
                    //If out of bounds, we don't touch
                    continue;
                }

                //If in bounds, light up the space
                PS.alpha(x, y, 255);
            }
        }

        //Spotlight everything else that needs to be spotlighted
        for(var s = 0; s < G.spotLighted.length; s++) {
            centerX = G.spotLighted[s][0];
            centerY = G.spotLighted[s][1];
            for(var x = centerX-1; x < centerX+2; x++) {
                for (var y = centerY-1; y < centerY+2; y++) {
                    //Check if out of bounds
                    if(x < 0 || x > G.DIMENSION-1 || y < 0 || y > G.DIMENSION-1) {
                        //If out of bounds, we don't touch
                        continue;
                    }

                    //If in bounds, light up the space
                    PS.alpha(x, y, 255);
                }
            }
        }
    },

    lumenPickup: function(x, y) {
        //Set back to normal floor bead
        PS.color(x, y, G.FLOOR_COLOR);
        PS.radius(x, y, PS.DEFAULT);
        PS.scale(x, y, PS.DEFAULT);
        PS.bgAlpha(x, y, 0);
        PS.data(x, y, 1);
        PS.audioPlay("fx_coin2");



        //If first lumen, set to special status line
        if(G.lumenCounter === 0) {
            G.currentStatusLine = "Huh...well that's new";
        }

        G.lumenCounter++;

        G.newStatus();
    },

    //Automatically updates status with the lumen count
    newStatus: function() {
        var newStatus = "[" + G.lumenCounter + "/5] " + G.currentStatusLine;
        PS.statusText(newStatus);
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
    PS.border(PS.ALL, PS.ALL, 0);
	PS.statusText( "Tunnel Vision" );
    PS.statusColor(PS.COLOR_WHITE);
    PS.gridColor(PS.COLOR_GRAY);

    //Load audio
    PS.audioLoad("fx_coin2");
    PS.audioLoad("fx_powerup5");

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

