// whither.js for Perlenspiel 3.3

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict";

// Whither
// By Ryan Melville and Patrick Petersen
// Updated to ES6 by Brian Moriarty

// Music by Kevin MacLeod: "Fantastic Dim Bar"
// <http://freepd.com/Piano/Fantastic%20Dim%20Bar>

const W = ( function () {
	// CONSTANTS

	const _WIDTH = 10; // grid width
	const _HEIGHT = 10; // grid height

	const _IS_FLOOR = "floor"; // floor ID
	const _IS_GOAL = "goal"; // goal ID
	const _IS_WALL = "wall"; // wall ID
	const _IS_FOOD = "food"; // food ID

	// const _STEP1 = 255;
	// const _STEP2 = 128;
	const _STEP3 = 85;
	const _STEP4 = 64;
	const _STEP5 = 51;
	const _STEP6 = 43;
	// const _STEP7 = 36;
	// const _STEP8 = 32;
	// const _STEP9 = 28;
	// const _STEP10 = 26;
	// const _STEP11 = 24;
	// const _STEP12 = 22;
	const _STEP13 = 20;

	const _COLOR_FLOOR = PS.COLOR_GRAY;
	const _COLOR_FLOOR_BORDER = PS.COLOR_GRAY;
	const _COLOR_GOAL = PS.COLOR_GRAY;
	const _COLOR_GOAL_BORDER = PS.COLOR_BLACK;
	const _COLOR_ACTOR = PS.COLOR_BLACK;
	const _COLOR_ACTOR_BORDER = PS.COLOR_GRAY;
	const _COLOR_WALL = PS.COLOR_WHITE;
	const _COLOR_WALL_BORDER = PS.COLOR_GRAY;
	const _COLOR_FOOD = PS.COLOR_BLACK;
	const _COLOR_FOOD_BORDER = PS.COLOR_GRAY;

	const _WIDTH_GOAL_BORDER = 3;
	const _WIDTH_FOOD_BORDER = 20;

	// VARIABLES

	let _play = true; // false if movement enabled
	let _music = false; // true if music started
	let _channel = ""; // channel id of music

	let _max_x; // maximum actor x-pos
	let _max_y; // maximum actor y-pos

	let _level = 20; // starting/current level

	let _actor_x; // current actor x-pos
	let _actor_y; // current actor y-pos
	let _actor_size; // current actor border size (0 = full)

	let _goal_x; // current goal x-pos
	let _goal_y; // current goal y-pos
	let _goal_delta; // goal alpha delta

	let _foods; // list of foods: [x, y]

	let _fade_walls; // list of fade walls: [x, y, delta]
	let _fade_foods; // list of fade foods: [x, y, delta]

	// This array of objects contains the
	// initialization data for each level
	// (required) actor_x, actor_y = actor x/y position
	// (required) actor_size = actor size
	// (optional) goal_x, goal_y = goal x/y position
	// (optional) goal_delta = goal alpha delta
	// (optional) walls = list of walls: [x, y]
	// (optional) fade_walls = list of fading walls: [x, y, delta]
	// (optional) foods = list of foods: [x, y]
	// (optional) fade_foods = list of fading foods: [x, y, delta]

	const _LEVELS = [
		// Level 0
		{
			actor_x : 1,
			actor_y : 1,
			actor_size : 0
		},

		// Level 1
		{
			actor_x : 2,
			actor_y : 6,
			actor_size : 2,

			goal_x : 7,
			goal_y : 6
		},

		// Level 2
		{
			actor_x : 2,
			actor_y : 2,
			actor_size : 2,

			goal_x : 7,
			goal_y : 7
		},

		// Level 3
		{
			actor_x : 3,
			actor_y : 5,
			actor_size : 4,

			goal_x : 7,
			goal_y : 5,

			walls : [
				[ 5, 4 ], [ 5, 5 ], [ 5, 6 ]
			]
		},

		// Level 4
		{
			actor_x : 7,
			actor_y : 7,
			actor_size : 2,

			goal_x : 2,
			goal_y : 2,

			walls : [
				[ 0, 4 ], [ 2, 4 ], [ 2, 6 ], [ 2, 8 ],
				[ 3, 3 ], [ 4, 0 ], [ 4, 6 ], [ 4, 8 ],
				[ 5, 3 ], [ 5, 5 ], [ 6, 6 ], [ 7, 3 ],
				[ 8, 4 ], [ 8, 6 ], [ 9, 9 ]
			]
		},

		// Level 5
		{
			actor_x : 1,
			actor_y : 4,
			actor_size : 0,

			goal_x : 8,
			goal_y : 3,

			walls : [
				[ 3, 2 ], [ 3, 3 ], [ 3, 5 ], [ 3, 6 ],
				[ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 7, 3 ],
				[ 5, 3 ], [ 5, 5 ], [ 6, 6 ], [ 7, 3 ],
				[ 7, 4 ], [ 7, 6 ], [ 7, 7 ]
			]
		},

		// Level 6
		{
			actor_x : 2,
			actor_y : 5,
			actor_size : 6,

			goal_x : 6,
			goal_y : 2,

			foods : [
				[ 4, 4 ]
			]
		},

		// Level 7
		{
			actor_x : 7,
			actor_y : 2,
			actor_size : 4,

			goal_x : 2,
			goal_y : 7,

			foods : [
				[ 1, 2 ]
			]
		},

		// Level 8
		{
			actor_x : 3,
			actor_y : 7,
			actor_size : 4,

			goal_x : 8,
			goal_y : 2,

			walls : [
				[ 4, 3 ], [ 5, 3 ],
				[ 6, 3 ], [ 6, 4 ]
			],

			foods : [
				[ 5, 4 ]
			]
		},

		// Level 9
		{
			actor_x : 1,
			actor_y : 8,
			actor_size : 2,

			goal_x : 8,
			goal_y : 1,

			walls : [
				[ 0, 6 ], [ 1, 6 ], [ 2, 6 ], [ 3, 6 ],
				[ 5, 8 ], [ 5, 9 ], [ 6, 0 ], [ 6, 3 ],
				[ 7, 3 ], [ 8, 3 ], [ 9, 3 ]
			],

			foods : [
				[ 4, 1 ], [ 5, 5 ]
			]
		},

		// Level 10
		{
			actor_x : 3,
			actor_y : 5,
			actor_size : 4,

			goal_x : 7,
			goal_y : 5,

			walls : [
				[ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ],
				[ 5, 6 ], [ 5, 7 ], [ 5, 8 ]
			],

			fade_walls : [
				[ 5, 5, _STEP4 ] // x, y, alpha delta
			]
		},

		// Level 11
		{
			actor_x : 8,
			actor_y : 8,
			actor_size : 2,

			goal_x : 3,
			goal_y : 3,

			walls : [
				[ 3, 6 ], [ 3, 7 ], [ 3, 8 ], [ 3, 9 ],
				[ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 5 ],
				[ 5, 3 ], [ 5, 7 ], [ 6, 4 ], [ 6, 5 ],
				[ 6, 6 ]

			],

			fade_walls : [
				[ 5, 3, _STEP5 ] // x, y, alpha delta
			]
		},

		// Level 12
		{
			actor_x : 4,
			actor_y : 0,
			actor_size : 6,

			goal_x : 8,
			goal_y : 5,

			walls : [
				[ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ],
				[ 6, 4 ], [ 6, 5 ], [ 6, 6 ]
			],

			fade_walls : [
				[ 6, 3, _STEP4 ] // x, y, alpha delta
			],

			foods : [
				[ 5, 7 ], [ 7, 7 ]
			]
		},

		// Level 13
		{
			actor_x : 2,
			actor_y : 7,
			actor_size : 8,

			goal_x : 5,
			goal_y : 2,

			fade_foods : [
				[ 5, 5, _STEP5 ] // x, y, alpha delta
			]
		},

		// Level 14
		{
			actor_x : 6,
			actor_y : 1,
			actor_size : 10,

			goal_x : 1,
			goal_y : 2,

			foods : [
				[ 5, 5 ]
			],

			fade_foods : [
				[ 5, 4, _STEP3 ] // x, y, alpha delta
			]
		},

		// Level 15
		{
			actor_x : 5,
			actor_y : 2,
			actor_size : 8,

			goal_x : 6,
			goal_y : 7,

			walls : [
				[ 6, 2 ], [ 5, 3 ], [ 5, 4 ]
			],

			foods : [
				[ 2, 4 ]
			],

			fade_foods : [
				[ 6, 3, _STEP6 ] // x, y, alpha delta
			]
		},

		// Level 16
		{
			actor_x : 1,
			actor_y : 5,
			actor_size : 8,

			goal_x : 7,
			goal_y : 2,

			walls : [
				[ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ],
				[ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ],
				[ 8, 5 ], [ 9, 5 ]
			],

			fade_walls : [
				[ 5, 4, _STEP13 ]
			],

			foods : [
				[ 2, 0 ], [ 6, 4 ], [ 4, 3 ]
			],

			fade_foods : [
				[ 3, 1, _STEP6 ] // x, y, alpha delta
			]
		},

		// Level 17
		{
			actor_x : 4,
			actor_y : 8,
			actor_size : 6,

			goal_x : 1,
			goal_y : 3,
			goal_delta : 32
		},

		// Level 18
		{
			actor_x : 3,
			actor_y : 2,
			actor_size : 0,

			goal_x : 5,
			goal_y : 5,
			goal_delta : 24,

			walls : [
				[ 2, 5 ], [ 3, 7 ], [ 3, 6 ], [ 3, 4 ],
				[ 4, 3 ], [ 5, 3 ], [ 6, 3 ], [ 7, 4 ]
			],

			foods : [
				[ 1, 6 ], [ 4, 8 ]
			]
		},

		// Level 19
		{
			actor_x : 7,
			actor_y : 5,
			actor_size : 6,

			goal_x : 1,
			goal_y : 4,
			goal_delta : 26,

			walls : [
				[ 4, 3 ], [ 3, 4 ], [ 5, 2 ], [ 4, 5 ],
				[ 6, 6 ], [ 7, 6 ]
			],

			fade_walls : [
				[ 3, 4, _STEP4 ]  // 60
			],

			fade_foods : [
				[ 3, 7, _STEP5 ]
			]
		},

		// Level 20
		{
			actor_x : 0,
			actor_y : 0,
			actor_size : 0,

			walls : [
				[ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 7, 1 ], [ 8, 1 ],
				[ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ], [ 8, 6 ], [ 8, 7 ], [ 8, 8 ],
				[ 1, 8 ], [ 2, 8 ], [ 3, 8 ], [ 4, 8 ], [ 5, 8 ], [ 6, 8 ], [ 7, 8 ],
				[ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ],
				[ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 6, 3 ],
				[ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ],
				[ 3, 6 ], [ 4, 6 ], [ 5, 6 ], [ 6, 6 ],
				[ 3, 5 ], [ 4, 5 ],
			],

			foods : [
				[ 6, 0 ], [ 7, 0 ],
				[ 9, 4 ], [ 9, 5 ],
				[ 7, 9 ], [ 6, 9 ],
				[ 0, 9 ], [ 0, 8 ],
				[ 0, 2 ], [ 1, 2 ],
				[ 5, 2 ],
				[ 7, 4 ],
				[ 6, 7 ],
				[ 3, 7 ],
				[ 2, 6 ],
				[ 2, 4 ],
				[ 4, 4 ],
			],

			goal_x : 5,
			goal_y : 5,
		}
	];

	// FUNCTIONS

	// Place actor at x, y with size

	const _place_actor = function ( x, y, size ) {
		_actor_x = x;
		_actor_y = y;
		_actor_size = size;
		PS.color( x, y, _COLOR_ACTOR );
		PS.alpha( x, y, PS.ALPHA_OPAQUE );
		PS.border( x, y, size );
		PS.borderColor( x, y, _COLOR_ACTOR_BORDER );
		PS.borderAlpha( x, y, PS.ALPHA_OPAQUE );
		PS.data( x, y, _IS_FLOOR ); // set id
	};

	// Change x, y to floor

	const _place_floor = function ( x, y ) {
		PS.color( x, y, _COLOR_FLOOR );
		PS.alpha( x, y, PS.ALPHA_OPAQUE );
		PS.border( x, y, 0 );
		PS.borderColor( x, y, _COLOR_FLOOR_BORDER );
		PS.borderAlpha( x, y, PS.ALPHA_OPAQUE );
		PS.data( x, y, _IS_FLOOR ); // set id
	};

	// Change x, y to wall

	const _place_wall = function ( x, y ) {
		PS.color( x, y, _COLOR_WALL );
		PS.alpha( x, y, PS.ALPHA_OPAQUE );
		PS.border( x, y, 0 );
		PS.borderColor( x, y, _COLOR_WALL_BORDER );
		PS.borderAlpha( x, y, PS.ALPHA_OPAQUE );
		PS.data( x, y, _IS_WALL ); // set id
	};

	// Change x, y to food

	const _place_food = function ( x, y ) {
		PS.color( x, y, _COLOR_FOOD );
		PS.alpha( x, y, PS.ALPHA_OPAQUE );
		PS.border( x, y, _WIDTH_FOOD_BORDER );
		PS.borderColor( x, y, _COLOR_FOOD_BORDER );
		PS.borderAlpha( x, y, PS.ALPHA_OPAQUE );
		PS.data( x, y, _IS_FOOD ); // set id
	};

	// Start specified level

	const _start_level = function ( val ) {
		_level = val;
		if ( !_music && ( _level > 0 ) ) {
			_music = true;
			PS.statusText( "Whither" );
			PS.audioPlayChannel( _channel );
		}

		// Completely reset grid

		PS.gridColor( _COLOR_FLOOR );
		PS.color( PS.ALL, PS.ALL, _COLOR_FLOOR );
		PS.alpha( PS.ALL, PS.ALL, PS.ALPHA_OPAQUE );
		PS.border( PS.ALL, PS.ALL, 0 ); // hide borders
		PS.borderColor( PS.ALL, PS.ALL, _COLOR_FLOOR_BORDER );
		PS.borderAlpha( PS.ALL, PS.ALL, PS.ALPHA_OPAQUE );
		PS.data( PS.ALL, PS.ALL, _IS_FLOOR ); // all floor

		// Init level from data

		let data = _LEVELS[ _level ];

		// Setup actor

		_place_actor( data.actor_x, data.actor_y, data.actor_size );

		// Setup goal if defined

		_goal_x = data.goal_x;
		if ( _goal_x !== undefined ) {
			_goal_y = data.goal_y;
			_goal_delta = data.goal_delta || 0;
			PS.color( _goal_x, _goal_y, _COLOR_GOAL );
			PS.border( _goal_x, _goal_y, _WIDTH_GOAL_BORDER );
			PS.borderColor( _goal_x, _goal_y, _COLOR_GOAL_BORDER );
			PS.data( _goal_x, _goal_y, _IS_GOAL ); // set id
		}

		// Set up walls if any defined

		if ( data.walls !== undefined ) {
			let len = data.walls.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = data.walls[ i ];
				let x = pos[ 0 ];
				let y = pos[ 1 ];
				_place_wall( x, y );
			}
		}

		// Set up fading walls if any defined

		_fade_walls = data.fade_walls;
		if ( _fade_walls !== undefined ) {
			let len = _fade_walls.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = _fade_walls[ i ];
				let x = pos[ 0 ];
				let y = pos[ 1 ];
				_place_wall( x, y );
				pos[ 3 ] = true; // mark as active
			}
		}

		// Set up foods if any defined

		_foods = data.foods;
		if ( _foods !== undefined ) {
			let len = _foods.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = _foods[ i ];
				let x = pos[ 0 ];
				let y = pos[ 1 ];
				_place_food( x, y );
				pos[ 3 ] = true; // mark as active
			}
		}

		// Set up fading foods if any defined

		_fade_foods = data.fade_foods;
		if ( _fade_foods !== undefined ) {
			let len = _fade_foods.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = _fade_foods[ i ];
				let x = pos[ 0 ];
				let y = pos[ 1 ];
				_place_food( x, y );
				pos[ 3 ] = true; // mark as active
			}
		}
	};

	const _last_level = function () {
		PS.audioStop(_channel);
		PS.audioPlay( "ending", {fileTypes: ["wav"], path: "audio/", volume : 0.7} );
		PS.color(5, 5, PS.COLOR_BLACK);
		PS.gridColor(PS.COLOR_WHITE);
	};

	// Blackout for level fail

	const blackout = function () {
		_play = false; // disable play
		PS.gridColor( PS.COLOR_BLACK );
		PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
		PS.border( PS.ALL, PS.ALL, 0 );
		PS.alpha( PS.ALL, PS.ALL, 255 );

		PS.audioPause( _channel ); // pause music

		// One second delay ...

		let timer = PS.timerStart( 60, function () {
			PS.timerStop( timer );
			_start_level( _level ); // restart level
			PS.audioPause( _channel ); // unpause music
			_play = true; // enable play
		} );
	};

	// Move actor relative to current position

	const move = function ( x, y ) {
		if ( !_play ) { // if play disabled, abort
			return;
		}

		// Calc proposed position

		let nx = _actor_x + x;
		let ny = _actor_y + y;

		// If move is off grid, abort

		if ( ( nx < 0 ) || ( nx > _max_x ) || ( ny < 0 ) || ( ny > _max_y ) ) {
			return;
		}

		// Check data at new position for bead type

		let data = PS.data( nx, ny );
		if ( data === _IS_WALL ) {
			return; // done
		}

		if ( data === _IS_GOAL ) {
			let len = _LEVELS.length; // check # levels
			if ( ( _level + 1 ) < len ) {
				_level += 1; // loop on last level
			}
			else {
				_place_wall( _actor_x, _actor_y );
				_last_level();
				return;
			}
			_start_level( _level ); // next level
			return;
		}

		if ( data === _IS_FOOD ) {
			_actor_size -= 4; // grow actor

			// If food is on foods list, deactivate

			let found = false;
			if ( _foods !== undefined ) {
				let len = _foods.length;
				for ( let i = 0; i < len; i += 1 ) {
					let pos = _foods[ i ];
					let xp = pos[ 0 ];
					let yp = pos[ 1 ];
					if ( ( nx === xp ) && ( ny === yp ) ) {
						pos[ 3 ] = false; // deactivate
						found = true; // don't search _fade_foods
						break;
					}
				}
			}

			// If food is on _fade_foods list, deactivate

			if ( !found && ( _fade_foods !== undefined ) ) {
				let len = _fade_foods.length;
				for ( let i = 0; i < len; i += 1 ) {
					let pos = _fade_foods[ i ];
					let xp = pos[ 0 ];
					let yp = pos[ 1 ];
					if ( ( nx === xp ) && ( ny === yp ) ) {
						pos[ 3 ] = false; // deactivate
						break;
					}
				}
			}
		}
		else {
			_actor_size += 2; // shrink actor
			if ( _actor_size > 20 ) {
				if ( _level > 0 ) {
					blackout();
				}
				else {
					_start_level( 1 );
				}
				return;
			}
		}


		// Change previous actor position to floor
		if(_level === 20) {
			_place_wall( _actor_x, _actor_y );
		}
		else {
			_place_floor( _actor_x, _actor_y );
		}


		// Move actor

		_place_actor( nx, ny, _actor_size );

		// Handle _fade_walls (if any)

		if ( _fade_walls !== undefined ) {
			let len = _fade_walls.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = _fade_walls[ i ];
				if ( pos[ 3 ] ) { // active?
					let xp = pos[ 0 ];
					let yp = pos[ 1 ];
					let delta = pos[ 2 ];
					let alpha = PS.alpha( xp, yp ) - delta;
					if ( alpha <= 0 ) {
						_place_floor( xp, yp );
						pos[ 3 ] = false; // deactivate
					}
					else { // fade it
						PS.alpha( xp, yp, alpha );
					}
				}
			}
		}

		// Handle _fade_foods (if any)

		if ( _fade_foods !== undefined ) {
			let len = _fade_foods.length;
			for ( let i = 0; i < len; i += 1 ) {
				let pos = _fade_foods[ i ];
				if ( pos[ 3 ] ) { // active?
					let xp = pos[ 0 ];
					let yp = pos[ 1 ];
					let delta = pos[ 2 ];
					let alpha = PS.alpha( xp, yp ) - delta;
					if ( alpha <= 0 ) {
						_place_floor( xp, yp );
						pos[ 3 ] = false; // deactivate
					}
					else { // fade it
						PS.alpha( xp, yp, alpha );
					}
				}
			}
		}

		// Handle goal alpha

		if ( _goal_delta > 0 ) {
			let alpha = PS.borderAlpha( _goal_x, _goal_y ) - _goal_delta;
			if ( alpha <= 0 ) {
				_goal_delta = 0; // deactivate
				_place_floor( _goal_x, _goal_y );
			}
			else {
				PS.borderAlpha( _goal_x, _goal_y, alpha );
			}
		}
	};

	// Called when music is loaded

	const _loaded = function ( data ) {
		if ( data !== PS.ERROR ) {
			_channel = data.channel; // save channel ID
			if(_level === 20) {
				PS.audioPlayChannel( _channel ); //ADDED SO IT PLAYS ON LEVEL 20
			}

		}
	};

	// Methods of public W object

	return {
		init : function () {
			PS.gridSize( _WIDTH, _HEIGHT );
			PS.gridColor( PS.COLOR_GRAY );
			PS.statusText( "" );
			PS.statusColor( PS.COLOR_WHITE );

			// NOTE: Whither's music is an honorary member of the PS Audio Library

			PS.audioLoad( "whither", {
				onLoad : _loaded,
				loop : true,
				lock : true
			} );

			PS.audioLoad( "ending", {fileTypes: ["wav"], path: "audio/", volume : 0.5} );

			_max_x = _WIDTH - 1; // establish maximum x
			_max_y = _HEIGHT - 1; // and y

			_start_level( _level );
		},

		keyDown : function ( key ) {
			switch ( key ) {
				case PS.KEY_ARROW_UP:
				case 87:
				case 119: {
					move( 0, -1 );
					break;
				}
				case PS.KEY_ARROW_DOWN:
				case 83:
				case 115: {
					move( 0, 1 );
					break;
				}
				case PS.KEY_ARROW_LEFT:
				case 65:
				case 97: {
					move( -1, 0 );
					break;
				}
				case PS.KEY_ARROW_RIGHT:
				case 68:
				case 100: {
					move( 1, 0 );
					break;
				}
				default: {
					break;
				}
			}
		}
	};
} () );

PS.init = W.init;
PS.keyDown = W.keyDown;

