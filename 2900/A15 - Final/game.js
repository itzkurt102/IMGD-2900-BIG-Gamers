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

//All our custom functions and data
var G = {

    //Game variables and constants

    //Level Maps used to easily load in levels
    level1Map: [
        [0,0,0,0,'f',0,0,0,0,0,0,0,0],
        [0,0,0,0,'l',0,0,0,0,0,0,0,0],
        [0,0,0,0,'o',0,0,0,0,0,0,0,0],
        [0,'g','e','o','r','g','i','a',0,0,'u',0,0],
        [0,0,0,0,'i',0,0,0,0,0,'t',0,0],
        [0,0,'k',0,'d',0,0,0,0,0,'a',0,'I'],
        [0,'t','e','x','a','s',0,0,0,'o','h','i','O'],
        [0,0,'n',0,0,0,0,0,0,0,0,0,'W'],
        [0,0,'t',0,'m',0,'a','r','i','z','o','n','A'],
        [0,0,'u',0,'a',0,'l',0,0,0,0,'e',0],
        ['m','i','c','h','i','g','a','n',0,0,0,'w',0],
        [0,0,'k',0,'n',0,'s',0,0,0,0,'y',0],
        [0,0,'y',0,'e',0,'k',0,0,0,0,'o',0],
        [0,0,0,0,0,0,'a',0,0,0,0,'r',0],
        [0,0,0,0,0,0,0,0,0,0,0,'k',0],],
    level2Map: [
        [0,0,0,0,0,0,0,0,0,0,'P',0],
        [0,0,'c',0,0,0,0,0,'b','o','A','t'],
        [0,0,'o','c','e','a','n',0,0,0,'L',0],
        ['b',0,'c',0,0,0,0,'s','w','i','M',0],
        ['e',0,'o',0,0,'s','e','a',0,0,0,0],
        ['a',0,'n',0,0,'h',0,'n',0,0,0,0],
        ['c','r','u','i','s','e',0,'d',0,0,0,0],
        ['h',0,'t',0,0,'l',0,0,0,0,0,0],
        [0,0,0,0,0,'l',0,0,0,0,0,0]],
    level3Map: [
        [0,'f',0,0,0,0,0,0,0,0,0],
        ['k','a','v','e','n',0,0,0,0,0,0],
        [0,'r',0,0,0,0,0,0,0,0,0],
        [0,'a',0,0,'i',0,0,'m',0,0,0],
        [0,'d',0,0,'n',0,0,'o',0,0,0],
        ['s','a','l','i','s','b','u','r','y',0,0],
        [0,'y',0,0,'t',0,0,'g',0,0,0],
        [0,0,0,0,'i',0,0,'a',0,0,0],
        [0,'e','a','s','t',0,'U','N','I','T','Y'],
        [0,0,0,0,'u',0,0,0,0,0,0],
        [0,0,0,0,'t',0,0,0,0,0,0],
        ['f','u','l','l','e','r',0,0,0,0,0],],
    level4Map: [
        [0,0,0,0,0,0,0,0,'s',0,0],
        [0,0,0,'S',0,'D','E','S','I','G','N'],
        [0,0,0,'T',0,0,0,0,'g',0,0],
        [0,0,0,'M','a','p','p','i','n','g',0],
        [0,0,0,0,0,0,0,0,'i',0,0],
        [0,0,0,'a',0,0,0,0,'f',0,0],
        [0,'r','e','f','l','e','c','t','i','o','n'],
        [0,0,0,'f',0,0,0,0,'e',0,0],
        [0,'p','r','o','c','e','d','u','r','a','l'],
        [0,0,0,'r',0,0,0,0,0,0,'t'],
        [0,0,0,'d',0,0,0,0,0,0,'m'],
        ['h','u','m','a','n',0,0,0,0,0,0],
        [0,0,0,'n',0,0,0,0,0,0,0],
        [0,0,0,'c',0,0,0,0,0,0,0],
        [0,0,'m','e','m','o','r','y',0,0,0],
        ],

    //tutorial
    tutorial: [
        ['T','O','U','C','H','-','T','O','-','G','U','E','S','S'],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['✪', '⇐', 'R', 'O', 'T', 'A', 'T', 'E', 0, 0, 0, 0, 0, 0],
        ['⇑', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['R', 0, 'C', 'O', 'L', 'O', 'R', '-', 'K', 'E', 'Y', ':', 0, 0],
        ['O', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['T', 0, 'G', 'R', 'E', 'E', 'N', '✅', 0, 0, 'W', 'O', 'R', 'D'],
        ['A', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['T', 0, 'O', 'R', 'A', 'N', 'G', 'E', '~', 0, 'w', 'o', 'r', 'd'],
        ['E', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 'R', 'E', 'D', '❌', 0, 0, 0, 0, 'w', 'o', 'r', 'd'],

    ],
    levelSizes: [[13,15],[12,9], [11,12], [11,15], [14,11]], //sizes of levels
    currentPlayerMap: [], //stores the player's current progress
    activeLevelMap: [], //stores the active level map
    levelSolution: {}, //Hashtable that stores the current level solution
    currWordSolution: [], //Stores the currently highlighted word's solution
    currWordStartCoord: [0,0],
    currWordDir: "H", //The direction of the currently highlighted word.
    currDirection: "H", //H or V for horizontal or vertical. Direction of next highlight.
    currPuzzleW: 0, //Stores current puzzle width
    currPuzzleH: 0, //Stores current puzzle height
    inMenu: true, //boolean to keep track of whether we are in the menu or not
    defaultText: "Click on a word spot to guess!", //Default statusline text
    colorSwap: false, //for menu animations
    borderAnimLoc: [], //for menu animations
    borderAnimDir: [], //for menu animations
    borderAnimSprite: "", //for menu animations
    tickCounter: 0, //for menu animations

    //Colors:
    blankGridColor: 0x014040,
    blankUnwritableGridColor: 0x011F20,
    highlightColor: 0x038F85,
    fullWrongColor: 0xC5243D,
    halfWrongColor: 0xFFAF1C,
    correctColor: 0x84FB91,
    menuBorderColor: 0x7B838C,
    menuBeadBGColor: 0xecf7df,
    menulvl1BGColor: 0xF2CB05,
    menulvl2BGColor: 0x019587,
    menulvl3BGColor: 0xA6BC09,
    menulvl4BGColor: 0xA6035D,
    menulvlHoverColor: 0xF1F8FB,
    menubackgroundColor: 0x363940,
    buttonHoverColor: 0xF1F8FB,
    buttonNormalColor: 0x8AA6A3,
    buttonGlyphColor: 0x14140F,
    menuRulesColor: 0xb5ed74,



    //Loads the main menu
    loadMenu: function() {

        G.inMenu = true;

        //Set gridsize and background color
        PS.gridSize(9, 10);
        PS.gridColor(G.menubackgroundColor);

        //Set defaults for menu beads
        PS.color(PS.ALL, PS.ALL, G.menuBeadBGColor);
        PS.border(PS.ALL, PS.ALL, 0);
        PS.fade(PS.ALL, PS.ALL, 30);

        //draw a border around
        PS.color(0, PS.ALL, G.menuBorderColor);
        PS.color(8, PS.ALL, G.menuBorderColor);
        PS.color(PS.ALL, 0, G.menuBorderColor);
        PS.color(PS.ALL, 9, G.menuBorderColor);

        //Update status line
        PS.statusText("Click on a level to start!");
        PS.statusColor(PS.COLOR_WHITE);

        //Level 1
        PS.color(2, 2, G.menulvl1BGColor);
        PS.glyph(2, 2, 0x1F5FD);
        PS.color(3, 2, G.menulvl1BGColor);
        PS.glyph(3, 2, 0x1F30E);
        PS.color(2, 3, G.menulvl1BGColor);
        PS.glyph(2, 3, 0x004C);
        PS.color(3, 3, G.menulvl1BGColor);
        PS.glyph(3, 3, 0x0031);

        //Level 2
        PS.color(5, 2, G.menulvl2BGColor);
        PS.glyph(5, 2, 0x1F3DD);
        PS.color(6, 2, G.menulvl2BGColor);
        PS.glyph(6, 2, 0x1F965);
        PS.color(5, 3, G.menulvl2BGColor);
        PS.glyph(5, 3, 0x004C);
        PS.color(6, 3, G.menulvl2BGColor);
        PS.glyph(6, 3, 0x0032);

        //Level 3
        PS.color(2, 5, G.menulvl3BGColor);
        PS.glyph(2, 5, 0x1F3EB);
        PS.color(3, 5, G.menulvl3BGColor);
        PS.glyph(3, 5, 0x1F3E2);
        PS.color(2, 6, G.menulvl3BGColor);
        PS.glyph(2, 6, 0x004C);
        PS.color(3, 6, G.menulvl3BGColor);
        PS.glyph(3, 6, 0x0033);

        //Level 4
        PS.color(5, 5, G.menulvl4BGColor);
        PS.glyph(5, 5, 0x1F621);
        PS.color(6, 5, G.menulvl4BGColor);
        PS.glyph(6, 5, 0x1F480);
        PS.color(5, 6, G.menulvl4BGColor);
        PS.glyph(5, 6, 0x004C);
        PS.color(6, 6, G.menulvl4BGColor);
        PS.glyph(6, 6, 0x0034);

        //Tutorial/Rules Level
        PS.color(2, 8, G.menuRulesColor);
        PS.glyph(2, 8, "R");
        PS.color(3, 8, G.menuRulesColor);
        PS.glyph(3, 8, "U");
        PS.color(4, 8, G.menuRulesColor);
        PS.glyph(4, 8, "L");
        PS.color(5, 8, G.menuRulesColor);
        PS.glyph(5, 8, "E");
        PS.color(6, 8, G.menuRulesColor);
        PS.glyph(6, 8, "S");

        //Makes a sprite that moves along the border in a nice animation
        var newSprite = PS.spriteSolid(1, 1);

        //Set sprite properties
        PS.spritePlane(newSprite, 1);
        PS.spriteSolidColor(newSprite, 0xF2D14F);
        PS.spriteMove(newSprite, 0,0);
        G.borderAnimLoc = [0,0];
        G.borderAnimDir = [1,0];
        G.borderAnimSprite = newSprite;
        G.tickCounter = 0;
    },

    //returns true if character is a letter, false otherwise
    isCharacterALetter: function(char) {
        return (/[a-zA-Z]/).test(char);
    },

    //returns true if character is a capital letter, false otherwise
    isCharacterUpper: function(char) {
        return (/[A-Z]/).test(char);
    },

    //Checks if game is over. Returns true if level has been completed.
    isGameOver: function() {
        for(var x = 0; x < G.currPuzzleW; x++) {
            for (var y = 0; y < G.currPuzzleH; y++) {
                //only check if there is supposed to be a letter there
                if(G.activeLevelMap[y][x] !== 0) {
                    //If any of the player's letters are not the same as the solution, return false
                    if(G.currentPlayerMap[y][x] !== G.activeLevelMap[y][x].toLowerCase()) {
                        return false;
                    }
                }
            }
        }

        //If it got through the full board, we know it is totally correct
        return true;
    },

    //Loads level given
    loadLevel: function (levelNum, levelMap) {

        //fix for 0 indexing
        var lvl = levelNum - 1;

        //make sure we let everything know we are in a level now
        G.inMenu = false;

        //Set and save grid size
        PS.gridSize(G.levelSizes[lvl][0], G.levelSizes[lvl][1]+1);

        var width = levelMap[0].length;
        G.currPuzzleW = width;
        var height = levelMap.length;
        G.currPuzzleH = height;

        //Save the map given as the active level map
        G.activeLevelMap = levelMap;

        //Set default colors and status line
        PS.color(PS.ALL, G.levelSizes[lvl][1], G.blankUnwritableGridColor);
        PS.gridColor(0x4C5958);
        PS.statusText("Click on a spot to guess!");
        PS.statusColor(PS.COLOR_WHITE);

        //Reset everything else
        PS.borderColor(PS.ALL, PS.ALL, G.blankUnwritableGridColor);
        PS.radius(PS.ALL, PS.ALL, 5);
        G.levelSolution = {};

        //reset the current player map to empty array (of the same size) filled with 0s
        G.currentPlayerMap = new Array(G.levelSizes[lvl][1]).fill(0).map(() => new Array(G.levelSizes[lvl][0]).fill(0));

        //If we are in loading the tutorial, display a different message
        if(levelNum === 5) {
            PS.statusText("Hover boxes for more information!");
        }

        //If we are NOT loading the tutorial, add a hint button
        if(levelNum !== 5) {
            //Add hint button if not in the tutorial level
            PS.glyph(width-1, height, "⁇");
            PS.glyphColor(width-1, height, G.buttonGlyphColor);
            PS.color(width-1, height, G.buttonNormalColor);
            PS.fade(width-1, height, 20);
        }

        //Add back button
        PS.glyph(0, height, 0x21A9);
        PS.glyphColor(0, height, G.buttonGlyphColor);
        PS.color(0, height, G.buttonNormalColor);
        PS.fade(0, height, 20);

        //Set up starting grid:
        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                //Go through all the array indices

                if(G.isCharacterALetter(levelMap[y][x])) {
                    //If it is a letter, write it to the solution hashtable
                    var key = [x, y].join('|');
                    G.levelSolution[key] = levelMap[y][x].toLowerCase();

                    //and set it to writable spot color
                    PS.color(x, y, G.blankGridColor);

                    //If it is capitalized, we are providing a hint, so we draw the letters
                    if(G.isCharacterUpper(levelMap[y][x])) {
                        PS.glyphColor(x, y, G.correctColor);
                        PS.glyph(x, y, levelMap[y][x].toLowerCase());

                        //save it to the player's map too
                        G.currentPlayerMap[y][x] = levelMap[y][x].toLowerCase();
                    }

                }
                else if(levelNum === 5 && levelMap[y][x] !== 0) {
                    //If we are drawing the tutorial and encounter any symbol, it is drawn anyway

                    var key = [x, y].join('|');
                    G.levelSolution[key] = 'a';

                    PS.color(x, y, G.blankGridColor);
                    PS.glyphColor(x, y, G.correctColor);
                    PS.glyph(x, y, levelMap[y][x]);
                }
                else {
                    //If not a letter for a normal level, just make it a blank spot (colored differently)
                    PS.color(x, y, G.blankUnwritableGridColor);
                }
            }
        }

        //Add some additional details to the tutorial that can not be loaded automatically
        if(levelNum === 5) {
            PS.glyphColor(10, 8, G.halfWrongColor);
            PS.glyph(10, 8, "r");
            PS.glyphColor(11, 8, G.halfWrongColor);
            PS.glyph(11, 8, "w");
            PS.glyphColor(12, 8, G.halfWrongColor);
            PS.glyph(12, 8, "o");
            PS.glyphColor(13, 8, G.correctColor);
            PS.glyph(13, 8, "d");

            PS.glyphColor(10, 10, G.fullWrongColor);
            PS.glyph(10, 10, "z");
            PS.glyphColor(11, 10, G.fullWrongColor);
            PS.glyph(11, 10, "x");
            PS.glyphColor(12, 10, G.halfWrongColor);
            PS.glyph(12, 10, "o");
            PS.glyphColor(13, 10, G.correctColor);
            PS.glyph(13, 10, "d");
        }
    },

    //Resets highlights for player guesses
    resetHighlights: function() {
        //Reset grid colors:
        for(var x = 0; x < G.currPuzzleW; x++) {
            for(var y = 0; y < G.currPuzzleH; y++) {
                if(G.isCharacterALetter(G.activeLevelMap[y][x])) {
                    PS.color(x, y, G.blankGridColor);
                }
                else if(G.activeLevelMap === G.tutorial && G.activeLevelMap[y][x] !== 0) {
                    //Ensures that symbols drawn in the tutorial are are given the correct bead color
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
        //Resets highlights before adding new ones
        G.resetHighlights();

        //Storage for what coordinates will need to be highlighted
        var coordsToHighlight = [];

        //Save direction before it is swapped
        G.currWordDir = G.currDirection;

        //If it is a bead with a letter spot (a writable location)
        if(G.levelSolution[[x, y].join('|')] != null) {

            //Sets the current solution to the correct letter of the bead the player clicked on
            G.currWordSolution = [G.levelSolution[[x, y].join('|')]]

            //adds this to what needs to be highlighted
            coordsToHighlight.push([x, y]);

            //Now search in the direction that needs to be highlighted.
            if(G.currDirection == "H") {
                //Look left and right, adding any beads with letters to the highlight and stopping at anything else

                //Left
                for(var l = x-1; l > -1; l--) {
                    //If we have reached the extent in this direction- a null entry, break out
                    if(G.levelSolution[[l, y].join('|')] == null) {
                        break;
                    }

                    //Add this letter to the current word solution (the front) and to the highlight coords
                    G.currWordSolution.unshift(G.levelSolution[[l, y].join('|')]);
                    coordsToHighlight.unshift([l,y]);

                }

                //Right
                for(var r = x+1; r < G.currPuzzleW; r++) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[r, y].join('|')] == null) {
                        break;
                    }
                    //Add this letter to the current word solution (the back) and to the highlight coords
                    G.currWordSolution.push(G.levelSolution[[r, y].join('|')]);
                    coordsToHighlight.push([r,y]);
                }

                //Play a noise
                PS.audioPlay( "hori_switch", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );

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

                    //Add this letter to the current word solution (the front) and to the highlight coords
                    G.currWordSolution.unshift(G.levelSolution[[x, d].join('|')]);
                    coordsToHighlight.unshift([x,d]);

                }

                //Right
                for(var u = y+1; u < G.currPuzzleH; u++) {
                    //If we have reached the extent in this direction, break out
                    if(G.levelSolution[[x, u].join('|')] == null) {
                        break;
                    }
                    //Add this letter to the current word solution (the back) and to the highlight coords
                    G.currWordSolution.push(G.levelSolution[[x, u].join('|')]);
                    coordsToHighlight.push([x,u]);
                }

                //Play a noise
                PS.audioPlay( "vert_switch", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );

                //Swap direction
                G.currDirection = "H";
            }
        }

        //Save the location of the first word, only if we are clicking on a valid word
        if(coordsToHighlight.length > 0) {
            G.currWordStartCoord = [coordsToHighlight[0][0], coordsToHighlight[0][1]];
        }

        //Highlight full word spot
        for(var i=0; i < coordsToHighlight.length; i++) {
            PS.color(coordsToHighlight[i][0], coordsToHighlight[i][1], G.highlightColor);
        }

        //Retry if it is one length- this means we tried to go in a direction for a word that is in the opposite direction
        //Running it again will have it go the other direction and will work correctly
        if(coordsToHighlight.length == 1) {
            G.highlightGuessLoc(x,y);
        }
    },

    //This is run after new player input
    guess : function(text) {
        //Ensures the guess is in lowercase
        text = text.toLowerCase();

        //counts how many letters are correct in the guess
        var letterCorrect = 0;

        //stores the correct length of the word being guessed
        var correctLength = G.currWordSolution.length;

        //Reset the direction of highlighting so the user can click just click to guess again (ease of access)
        if(G.currDirection === "H") {
            G.currDirection = "V";
        }
        else {
            G.currDirection = "H";
        }



        //Check word length. Return an error message if the player guessed something of a different length
        if(text.length !== correctLength) {
            PS.statusText("Incorrect length: should be " + correctLength + " letters long.");
            //plays error sound
            PS.audioPlay( "errorGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
            return;
        }

        //TODO Check if valid word - No "easy" solution found. Kept in code for future expansion
        if(false) {
            PS.statusText("Not a valid word: try again!");
            PS.audioPlay( "errorGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
            return;
        }

        //Go through each character of guess
        for(var g=0; g < correctLength; g++) {
            var char = text[g];
            var status = -1; //-1 if not in word, 0 if in word wrong place, 1 if correct place

            //Check the solution to see if it is in both the guess and correct word
            for(var s=0; s < correctLength; s++) {
                if(char === G.currWordSolution[s]) {
                    //If both letters are in the same spot, we have a correct match and we can break out. Can't do better!
                    if(g === s) {
                        status = 1;
                        break;
                    }
                    else {
                        //Else, the letter is somewhere in the word, but we still keep going to check for an exact match
                        status = 0;
                    }
                }
            }

            //Gets x,y location of letter
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
                    letterCorrect++; //increment correct letter counter
                    break;
            }

            //And the correct glyph
            PS.glyph(x, y, char);
            //add to player map too
            G.currentPlayerMap[y][x] = char;
        }

        //Checks if game is over
        if(G.isGameOver()) {
            //If so, play victory sound and display message
            PS.statusText("Congratulations! You completed the puzzle!");
            PS.audioPlay( "victory", {fileTypes: ["wav"], path: "audio/", volume : 0.4} );
            return;
        }

        //Player guessed word correctly
        if(letterCorrect === correctLength) {
            //If so, play sound and display message
            PS.audioPlay( "correctGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
            PS.statusText("Nice Job!");
        }
        else {
            //Else, regular sound plays and the status line reviews the rules
            PS.audioPlay( "normalGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
            PS.statusText("Green = ✓, Red = ✖, Yellow = Wrong Spot.");
        }
    },

    //Provides the player with a hint - a randomly chosen letter that is "solved" for them
    hint : function() {

        //Stores potential hint options
        var options = [];

        for(var x = 0; x < G.currPuzzleW; x++) {
            for (var y = 0; y < G.currPuzzleH; y++) {
                if(G.activeLevelMap[y][x] !== 0) {
                    if(G.currentPlayerMap[y][x] !== G.activeLevelMap[y][x].toLowerCase()) {
                        //Saves any letter that is not currently correct
                        options.push([x,y]);
                    }
                }
            }
        }

        //No options for hints, so do nothing
        if(options.length === 0) {
            return;
        }

        //Get a random number
        var hint = PS.random(options.length)-1;

        //Grab that random hint
        var x = options[hint][0];
        var y = options[hint][1];

        //draws the hint - just a randomly chosen correctly placed letter
        PS.glyphColor(x, y, G.correctColor);
        PS.glyph(x, y, G.activeLevelMap[y][x].toLowerCase());
        G.currentPlayerMap[y][x] = G.activeLevelMap[y][x].toLowerCase();

    },

    //Timer tick
    tick : function() {
        //increment tick
        G.tickCounter += 1;

        //We are only concerned with the timer in the menu
        if(G.inMenu) {
            //Every 100 ticks, we randomly change the color of the menu border
            if(G.tickCounter % 100 === 0) {
                var rand_color = [PS.random(50), PS.random(50), PS.random(50)];
                PS.color(0, PS.ALL, rand_color);
                PS.color(8, PS.ALL, rand_color);
                PS.color(PS.ALL, 0, rand_color);
                PS.color(PS.ALL, 9, rand_color);
            }


            //Sprite animation:

            //Move border animation
            if(G.borderAnimLoc[0] === 0 && G.borderAnimLoc[1] === 0) {
                G.borderAnimDir = [1, 0];
            }
            else if(G.borderAnimLoc[0] === 8 && G.borderAnimLoc[1] === 0) {
                G.borderAnimDir = [0, 1];
            }
            else if(G.borderAnimLoc[0] === 8 && G.borderAnimLoc[1] === 9) {
                G.borderAnimDir = [-1, 0];
            }
            else if(G.borderAnimLoc[0] === 0 && G.borderAnimLoc[1] === 9) {
                G.borderAnimDir = [0, -1];
            }
            //Update location and move it there
            G.borderAnimLoc[0] = G.borderAnimLoc[0]+G.borderAnimDir[0];
            G.borderAnimLoc[1] = G.borderAnimLoc[1]+G.borderAnimDir[1];
            PS.spriteMove(G.borderAnimSprite, G.borderAnimLoc[0], G.borderAnimLoc[1]);
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

    //Load audio
    PS.audioLoad( "bgMusic", {fileTypes: ["mp3"], path: "audio/", loop : true, volume : 0.1} );
    PS.audioLoad( "correctGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
    PS.audioLoad( "errorGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
    PS.audioLoad( "hori_switch", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
    PS.audioLoad( "normalGuess", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
    PS.audioLoad( "vert_switch", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );
    PS.audioLoad( "victory", {fileTypes: ["wav"], path: "audio/", volume : 0.2} );

    //Play music
    PS.audioPlay( "bgMusic", {fileTypes: ["mp3"], path: "audio/", loop : true, volume : 0.1} );

    //Start timer
    PS.timerStart( 5, G.tick);

    //Loads the main menu
    G.loadMenu();
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

    //If we in the menu
    if(G.inMenu) {

        //Handle loading level depending on where the user touches
        if(x >= 2 && x <= 3 && y >= 2 && y <= 3) {
            G.loadLevel(1, G.level1Map);
        }
        else if(x >= 5 && x <= 6 && y >= 2 && y <= 3) {
            G.loadLevel(2, G.level2Map);
        }
        else if(x >= 2 && x <= 3 && y >= 5 && y <= 6) {
            G.loadLevel(3, G.level3Map);
        }
        else if(x >= 5 && x <= 6 && y >= 5 && y <= 6) {
            G.loadLevel(4, G.level4Map);
        }
        else if(x >= 2 && x <= 6 && y === 8) {
            G.loadLevel(5, G.tutorial);
        }
    }

    //If we are in a level
    else {
        //clicked on hint
        if(x === G.currPuzzleW-1 && y === G.currPuzzleH) {
            G.hint();
            return;
        }

        //Clicked on main menu button
        if(x === 0 && y === G.currPuzzleH) {
            G.loadMenu();
            return;
        }

        //Player has touched the playing field, so highlight their selection
        G.highlightGuessLoc(x, y);

        if(G.activeLevelMap === G.tutorial) {
            //No guessing allowed in tutorial!
            return;
        }

        //Handle guessing
        if(G.levelSolution[[x, y].join('|')] == null) {
            //Not on a word slot
            PS.statusText("Not a valid guess location, click elsewhere!");
        }
        else {
            PS.statusText("Click on a word spot to guess!");
            PS.statusInput("Guess Word ("+G.currWordSolution.length+"):", function(text) {
                G.guess(text);
            });
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

    //In menu
    if(G.inMenu) {
        //Set buttons to another color when hovering
        if(x >= 2 && x <= 3 && y >= 2 && y <= 3) {
            PS.color(2, 2, G.menulvlHoverColor);
            PS.color(3, 2, G.menulvlHoverColor);
            PS.color(2, 3, G.menulvlHoverColor);
            PS.color(3, 3, G.menulvlHoverColor);
        }
        else if(x >= 5 && x <= 6 && y >= 2 && y <= 3) {
            PS.color(5, 2, G.menulvlHoverColor);
            PS.color(6, 2, G.menulvlHoverColor);
            PS.color(5, 3, G.menulvlHoverColor);
            PS.color(6, 3, G.menulvlHoverColor);
        }
        else if(x >= 2 && x <= 3 && y >= 5 && y <= 6) {
            PS.color(2, 5, G.menulvlHoverColor);
            PS.color(3, 5, G.menulvlHoverColor);
            PS.color(2, 6, G.menulvlHoverColor);
            PS.color(3, 6, G.menulvlHoverColor);
        }
        else if(x >= 5 && x <= 6 && y >= 5 && y <= 6) {
            PS.color(5, 5, G.menulvlHoverColor);
            PS.color(6, 5, G.menulvlHoverColor);
            PS.color(5, 6, G.menulvlHoverColor);
            PS.color(6, 6, G.menulvlHoverColor);
        }
        else if(x >= 2 && x <= 6 && y === 8) {
            PS.color(2, 8, G.menulvlHoverColor);
            PS.color(3, 8, G.menulvlHoverColor);
            PS.color(4, 8, G.menulvlHoverColor);
            PS.color(5, 8, G.menulvlHoverColor);
            PS.color(6, 8, G.menulvlHoverColor);
        }
    }
    else {
        //In level

        //Set buttons to another color when hovering and display a message
        if(x === G.currPuzzleW-1 && y === G.currPuzzleH) {
            PS.color(G.currPuzzleW-1, G.currPuzzleH, G.buttonHoverColor);
            PS.statusText("Click for a hint!");
        }

        if(x === 0 && y === G.currPuzzleH) {
            PS.color(0, G.currPuzzleH, G.buttonHoverColor);
            PS.statusText("Click to go back to the main menu.");
        }

        //Tutorial hovering messages
        if(G.activeLevelMap === G.tutorial) {
            if(x > 1 && y === 6) {
                PS.statusText("Green → in the right location.");
            }
            else if(x > 1 && y === 4) {
                PS.statusText("Each letter's color means something.");
            }
            else if(x > 1 && y === 8) {
                PS.statusText("Yellow → wrong location, but in the word.");
            }
            else if(x > 1 && y === 10) {
                PS.statusText("Red → letter is not in the word.");
            }
            else if((x===0 && y <= 9 && y >= 2) || (y===2 && x <= 7 && x >= 0)) {
                PS.statusText("Touch an intersection to rotate highlight.");
            }
            else if(y === 0) {
                PS.statusText("Touch boxes like these to guess the word.");
            }
        }
    }

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


    //In menu
    if(G.inMenu) {
        //reset buttons to original color when hovering
        if(x >= 2 && x <= 3 && y >= 2 && y <= 3) {
            PS.color(2, 2, G.menulvl1BGColor);
            PS.color(3, 2, G.menulvl1BGColor);
            PS.color(2, 3, G.menulvl1BGColor);
            PS.color(3, 3, G.menulvl1BGColor);
        }
        else if(x >= 5 && x <= 6 && y >= 2 && y <= 3) {
            PS.color(5, 2, G.menulvl2BGColor);
            PS.color(6, 2, G.menulvl2BGColor);
            PS.color(5, 3, G.menulvl2BGColor);
            PS.color(6, 3, G.menulvl2BGColor);
        }
        else if(x >= 2 && x <= 3 && y >= 5 && y <= 6) {
            PS.color(2, 5, G.menulvl3BGColor);
            PS.color(3, 5, G.menulvl3BGColor);
            PS.color(2, 6, G.menulvl3BGColor);
            PS.color(3, 6, G.menulvl3BGColor);
        }
        else if(x >= 5 && x <= 6 && y >= 5 && y <= 6) {
            PS.color(5, 5, G.menulvl4BGColor);
            PS.color(6, 5, G.menulvl4BGColor);
            PS.color(5, 6, G.menulvl4BGColor);
            PS.color(6, 6, G.menulvl4BGColor);
        }
        else if(x >= 2 && x <= 6 && y === 8) {
            PS.color(2, 8, G.menuRulesColor);
            PS.color(3, 8, G.menuRulesColor);
            PS.color(4, 8, G.menuRulesColor);
            PS.color(5, 8, G.menuRulesColor);
            PS.color(6, 8, G.menuRulesColor);
        }
    }
    else {
        //In level
        //reset buttons to original color when hovering and reset message
        if(x === G.currPuzzleW-1 && y === G.currPuzzleH) {
            PS.color(G.currPuzzleW-1, G.currPuzzleH, G.buttonNormalColor);
            PS.statusText(G.defaultText);
        }

        if(x === 0 && y === G.currPuzzleH) {
            PS.color(0, G.currPuzzleH, G.buttonNormalColor);
            PS.statusText(G.defaultText);
        }
    }

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