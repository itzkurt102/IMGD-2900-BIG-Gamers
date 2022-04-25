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
    FLOOR_COLOR: 0x383838,
    PLAYER_COLOR: 0xEAF6F2,
    ENTRANCE_COLOR: 0x2BFF80,
    COLORED_WALL_COLOR:0x141726,
    COLORED_FLOOR_COLOR: 0xD95032,
    DIMENSION: 15,
    playerSprite: "",
    playerPos: [0,0],
    activeLevel: 0,
    activeSubLevel: 0,
    spotLighted: [],
    lumenCounter: 0,
    lumensFound: {},
    currentStatusLine: "",
    levelColored: [],
    levelSpotlighted: [],
    timerActive: false,
    timer: "",
    moveX: 0,
    moveY: 0,
    levelLOSlight: [],
    timeString: "",
    secondsPlayed: 0,
    secondFlag: 0,
    gameOver: false,


    /*
    Color matches:

    LUMEN - 0xD95032
    WALL - 0x141726
    FLOOR - 0xD95032
    ARRAY - [0xD95032,0x141726,0xD95032]
    -------------------------------------
    LUMEN - 0xFF3B71
    WALL - 0x110559
    FLOOR - 0xF205CB
    ARRAY - [0xFF3B71,0x110559,0xF205CB]
    -------------------------------------
    LUMEN - 0xC729F2
    WALL - 0x2E0B45
    FLOOR - 0x7B17A6
    ARRAY - [0xC729F2,0x2E0B45,0x7B17A6]
    -------------------------------------
    LUMEN - 0xF2E205
    WALL - 0x8C4507
    FLOOR - 0xDBA908
    ARRAY - [0xF2E205,0x8C4507,0xDBA908]
    -------------------------------------
    LUMEN - 0x05F2DB
    WALL - 0x132126
    FLOOR - 0x05CBDB
    ARRAY - [0x05F2DB,0x132126,0x05CBDB]
     */


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
                        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
                            PS.color(x, y, G.COLORED_WALL_COLOR);
                        }
                        else {
                            PS.color(x, y, G.WALL_COLOR);
                        }
                        break;

                    case 1:
                        //FLOOR
                        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
                            PS.color(x, y, G.COLORED_FLOOR_COLOR);
                        }
                        else {
                            PS.color(x, y, G.FLOOR_COLOR);
                        }
                        PS.data(x, y, 1);
                        break;
                    case 2:
                        //PLAYER
                        break;
                    case 3:
                        //ENTRANCE
                        PS.color(x, y, G.ENTRANCE_COLOR);
                        PS.data(x, y, 3);
                        G.spotLighted.push([x,y]);
                        break;
                    default:
                        //LUMEN

                        if(G.lumensFound[map[y][x]] === null) {
                            //This means it is first time being loaded
                            G.lumensFound[map[y][x]] = 0;
                        }
                        else if(G.lumensFound[map[y][x]] === 1) {
                            //This means it was already found, so we want to not load it back in, we treat it like floor
                            //FLOOR
                            if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
                                PS.color(x, y, G.COLORED_FLOOR_COLOR);
                            }
                            else {
                                PS.color(x, y, G.FLOOR_COLOR);
                            }
                            PS.data(x, y, 1);
                            break;
                        }

                        PS.color(x, y, PS.COLOR_BLUE);
                        PS.data(x, y, map[y][x]);
                        PS.radius(x, y, 50);
                        PS.scale(x, y, 50);
                        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
                            PS.bgColor(x, y, G.COLORED_FLOOR_COLOR);
                        }
                        else {
                            PS.bgColor(x, y, G.FLOOR_COLOR);
                        }
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
                        //Level Map: (0=wall, 1=floor, 2=player, 3=entrance, 4+=lumen)
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        PS.statusText("WASD/Arrow Keys to move.");
                        G.activeLevel = 1;
                        G.activeSubLevel = 0;
                        G.loadMap(map);
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
                            [0,3,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        PS.statusText("Maybe that does something...");
                        G.currentStatusLine =  "Maybe that does something...";
                        G.activeLevel = 2;
                        G.activeSubLevel = 0;
                        G.loadMap(map);
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
                            [0,3,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.currentStatusLine = "Hmm...I wonder where that goes...";
                        G.newStatus();
                        G.activeLevel = 3;
                        G.activeSubLevel = 0;
                        G.loadMap(map);
                        break;
                    case 1:
                        var map = [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,1,1,1,1,1,1,0,1,1,5,0],
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
                        G.activeLevel = 3;
                        G.activeSubLevel = 1;
                        G.loadMap(map);
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
                            [0,3,1,1,1,1,1,1,1,1,1,1,1,3,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                            [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.currentStatusLine = "Uhh...who turned out the lights?";
                        G.newStatus();
                        G.activeLevel = 4;
                        G.activeSubLevel = 0;
                        G.loadMap(map);
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
                            [1,1,1,1,1,1,1,1,6,0,1,0,1,0,1],
                            [0,0,0,0,0,0,0,0,0,0,1,1,1,0,3]];

                        G.activeLevel = 4;
                        G.activeSubLevel = 1;
                        G.loadMap(map);
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
                            [0,1,1,1,1,1,1,0,1,0,1,0,1,7,0],
                            [0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],
                            [0,1,0,1,1,1,0,1,1,0,1,1,1,1,0],
                            [0,1,0,1,0,1,0,1,0,0,0,0,0,1,0],
                            [0,1,1,1,0,1,1,1,0,1,1,1,0,1,0],
                            [0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
                            [0,1,1,1,1,1,1,1,1,1,0,8,1,1,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

                        G.activeLevel = 4;
                        G.activeSubLevel = 2;
                        G.loadMap(map);
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

                        G.gameOver = true;
                        G.newStatus();
                        G.activeLevel = 5;
                        G.activeSubLevel = 0;
                        G.loadMap(map);
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
                PS.audioPlay( "wall-walk", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
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
                        //If y is in the middle of the level, we know it is going to next/previous level

                        if(newX > 7) {
                            //If we are going to the next level
                            PS.audioPlay( "warp-in", {fileTypes: ["wav"], path: "audio/", volume : 1.0} );
                            newX = newX-11;
                            G.loadLevel(G.activeLevel + 1, 0);
                            G.playerPos = [newX, newY];
                            PS.spriteMove(G.playerSprite, newX, newY);
                        }
                        else if(newX < 7) {
                            PS.audioPlay( "warp-out", {fileTypes: ["wav"], path: "audio/", volume : 1.0} );
                            //If we are going to the previous level
                            newX = newX+11;
                            G.loadLevel(G.activeLevel - 1, 0);
                            G.playerPos = [newX, newY];
                            PS.spriteMove(G.playerSprite, newX, newY);
                        }

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
                    PS.audioPlay( "warp-out", {fileTypes: ["wav"], path: "audio/", volume : 1.0} );
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

            default:
                //LUMEN - Handle pickup and move to location
                G.playerPos = [newX, newY];
                PS.spriteMove(G.playerSprite, newX, newY);
                G.lumenPickup(newX, newY);
                break;
        }

        //Make player circle and fix bgColor
        PS.radius(newX, newY, 50);
        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
            PS.bgColor(newX, newY, G.COLORED_FLOOR_COLOR);
        }
        else {
            PS.bgColor(newX, newY, G.FLOOR_COLOR);
        }
        PS.bgAlpha(newX, newY, 255);
        PS.scale(newX, newY, 80);

        //Make sure last location is set back to normal
        PS.radius(newX-dx, newY-dy, PS.DEFAULT);
        PS.bgAlpha(newX-dx, newY-dy, PS.DEFAULT);
        PS.scale(newX-dx, newY-dy, PS.DEFAULT);


        //Handle lighting:
        if(G.levelSpotlighted[G.activeLevel][G.activeSubLevel]) {
            G.spotLight(newX, newY);
        }
        else if(G.levelLOSlight[G.activeLevel][G.activeSubLevel]) {
            G.losLight(newX, newY);
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
        var lumenID = PS.data(x, y);

        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
            PS.color(x, y, G.COLORED_FLOOR_COLOR);
        }
        else {
            PS.color(x, y, G.FLOOR_COLOR);
        }
        PS.radius(x, y, PS.DEFAULT);
        PS.scale(x, y, PS.DEFAULT);
        PS.bgAlpha(x, y, 0);
        PS.data(x, y, 1);




        //If first lumen, set to special status line
        if(G.lumenCounter === 0) {
            G.currentStatusLine = "Huh...well that's new";
        }
        if(G.activeLevel === 4) {
            G.currentStatusLine = "Oh...these make everything bright!";
        }

        G.lumenCounter++;
        G.lumensFound[lumenID] = 1;

        G.newStatus();

        PS.audioPlay( "lumen-pickup", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
        //Check to make sure we didnt do it before for this level
        if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
            //If we already dealt with the color changing, just end here
            return;
        }

        PS.audioPlay( "color-transform", {fileTypes: ["wav"], path: "audio/", volume : 1.0} );
        G.levelColored[G.activeLevel][G.activeSubLevel] = true;

        PS.fade(PS.ALL, PS.ALL, 100);
        G.loadLevel(G.activeLevel, G.activeSubLevel);

        if(G.levelSpotlighted[G.activeLevel][G.activeSubLevel]) {
            PS.alpha(PS.ALL, PS.ALL, PS.DEFAULT);
            G.levelSpotlighted[G.activeLevel][G.activeSubLevel] = false;
        }

        G.timerActive = true;
        G.timer = PS.timerStart(101, G.tick);

    },

    losLight: function(centerX, centerY) {
        PS.alpha(PS.ALL, PS.ALL, 0);

        //Go up until a wall is hit
        for(var y = centerY-1; y > 0; y--) {
            var beadData = PS.data(centerX, y);
            PS.alpha(centerX, y, 255);
            if(beadData === 0) {
                //If the bead is a wall, we stop the light in this direction
                break;
            }
        }

        //Go down until a wall is hit
        for(var y = centerY+1; y < G.DIMENSION; y++) {
            var beadData = PS.data(centerX, y);
            PS.alpha(centerX, y, 255);
            if(beadData === 0) {
                //If the bead is a wall, we stop the light in this direction
                break;
            }
        }

        //Go left until a wall is hit
        for(var x = centerX-1; x > 0; x--) {
            var beadData = PS.data(x, centerY);
            PS.alpha(x, centerY, 255);
            if(beadData === 0) {
                //If the bead is a wall, we stop the light in this direction
                break;
            }
        }

        //Go right until a wall is hit
        for(var x = centerX+1; x < G.DIMENSION; x++) {
            var beadData = PS.data(x, centerY);
            PS.alpha(x, centerY, 255);
            if(beadData === 0) {
                //If the bead is a wall, we stop the light in this direction
                break;
            }
        }

        //Light up everything else that needs to be lit up
        for(var s = 0; s < G.spotLighted.length; s++) {
            centerX = G.spotLighted[s][0];
            centerY = G.spotLighted[s][1];
            PS.alpha(centerX, centerY, 255);
        }
    },

    //Automatically updates status with the lumen count
    newStatus: function() {
        var newStatus = G.timeString + " [" + G.lumenCounter + "/5] " + G.currentStatusLine;
        PS.statusText(newStatus);
    },

    tick: function() {
        PS.fade(PS.ALL, PS.ALL, PS.DEFAULT);
        G.timerActive = false;
        PS.timerStop(G.timer);
    },

    moveTick: function() {
        //Only move if the lumen is not transforming and the player is actually moving
        if (!G.timerActive && (G.moveX !== 0 || G.moveY !== 0)) {
            G.movePlayer(G.moveX, G.moveY);
        }

        //Update timer
        G.secondFlag += 5;
        if(G.secondFlag === 60) {
            G.secondsPlayed++;
            G.secondFlag = 0;
        }
        G.gameTime();
    },

    gameTime: function() {

        if(!G.gameOver) {
            var hours = Math.floor(G.secondsPlayed / 3600);
            var totalSeconds = G.secondsPlayed % 3600;
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;

            var inbetween = ""

            if(seconds < 10) {
                inbetween = " : 0";
            }
            else {
                inbetween = " : ";
            }

            G.timeString = minutes + inbetween + seconds;
            G.newStatus();
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
    PS.border(PS.ALL, PS.ALL, 0);
	PS.statusText( "Tunnel Vision" );
    PS.statusColor(PS.COLOR_WHITE);
    PS.gridColor(PS.COLOR_BLACK);

    //Load audio
    PS.audioLoad("fx_coin2");
    PS.audioLoad("fx_powerup5");

    //Makes a sprite that will be the player sprite
    var newSprite = PS.spriteSolid(1, 1);

    //Set sprite properties
    PS.spritePlane(newSprite, 4);
    PS.spriteSolidColor(newSprite, G.PLAYER_COLOR);
    PS.spriteMove(newSprite, 1, 7);

    //Save information
    G.playerSprite = newSprite;
    G.playerPos = [1, 7];

    //Set the tile to a normal floor tile since the sprite is on top
    PS.color(1, 7, G.FLOOR_COLOR);
    PS.data(1, 7, 1);

    //Initialize colorLevel array
    for(var i = 0; i < 6; i++) {
        G.levelColored[i] = [false, false, false];
        G.levelSpotlighted[i] = [false, false, false];
        G.levelLOSlight[i] = [false, false, false];
    }
    G.levelSpotlighted[4] = [true, true, true];

    //Load Audio
    PS.audioLoad( "warp-in", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
    PS.audioLoad( "warp-out", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
    PS.audioLoad( "color-transform", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
    PS.audioLoad( "lumen-pickup", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );
    G.loadLevel(1, 0);

    PS.timerStart(5, G.moveTick);

    //Make starting player circle and fix bgColor
    PS.radius(1, 7, 50);
    if(G.levelColored[G.activeLevel][G.activeSubLevel]) {
        PS.bgColor(1, 7, G.COLORED_FLOOR_COLOR);
    }
    else {
        PS.bgColor(1, 7, G.FLOOR_COLOR);
    }
    PS.bgAlpha(1, 7, 255);
    PS.scale(1, 7, 80);
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
            //W
        case PS.KEY_ARROW_UP:
            G.moveY = -1;
            break;

        case 97:
            //A
        case PS.KEY_ARROW_LEFT:
            G.moveX = -1;
            break;

        case 115:
            //S
        case PS.KEY_ARROW_DOWN:
            G.moveY = 1;
            break;

        case 100:
            //D
        case PS.KEY_ARROW_RIGHT:
            G.moveX = 1;
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

    switch(key) {

        case 119:
        //W
        case PS.KEY_ARROW_UP:
            G.moveY = 0;
            break;

        case 97:
        //A
        case PS.KEY_ARROW_LEFT:
            G.moveX = 0;
            break;

        case 115:
        //S
        case PS.KEY_ARROW_DOWN:
            G.moveY = 0;
            break;

        case 100:
        //D
        case PS.KEY_ARROW_RIGHT:
            G.moveX = 0;
            break;
    }

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

