// 1 - 2
// 3 - 4
// 5 - 6
// 7 - 8

var grey_back = 1;
var grey_front = 2;
var yellow_back = 3;
var yellow_front = 4;
var white_back = 5;
var white_front = 6;
var green_back = 7;
var green_front = 8;

var horse_head = 1;
var horse_body = 2;
var fish_head = 3;
var fish_body = 4;
var crab_up = 5;
var crab_down = 6;
var shell_dildo = 7;
var shell_star = 8;

var theMap = {
	[horse_head]: 'horse_head',
	[horse_body]: 'horse_body',

	[fish_body]: 'fish_body',
	[fish_head]: 'fish_head',

	[crab_up]: 'crab_up',
	[crab_down]: 'crab_down',

	[shell_dildo]: 'shell_dildo',
	[shell_star]: 'shell_star'
}

var theMap = {
	[grey_back]: 'grey_back',
	[grey_front]: 'grey_front',

	[yellow_front]: 'yellow_front',
	[yellow_back]: 'yellow_back',

	[white_back]: 'white_back',
	[white_front]: 'white_front',

	[green_front]: 'green_front',
	[green_back]: 'green_back'
}

var top_left = 0;
var top_middle = 1;
var top_right = 2;
var middle_left = 3;
var middle_middle = 4;
var middle_right = 5;
var bottom_left = 6;
var bottom_middle = 7;
var bottom_right = 8;

function Piece(top, left, right, bottom) {
	// Store what is on this side
	this.top = top;
	this.left = left;
	this.right = right;
	this.bottom = bottom;

	// Rotation
	// 0 = 0
	// 1 = 90 clock
	// 2 = 180 clock
	// 3 = 270 clock
	this.rot = 0;
}

Piece.prototype.getTop = function() {
	switch(this.rot) {
		case 0:
			return this.top;
		break;

		case 1:
			return this.left;
		break;

		case 2:
			return this.bottom;
		break;

		case 3:
			return this.right;
		break;
	}
}

Piece.prototype.getLeft = function() {
	switch(this.rot) {
		case 0:
			return this.left;
		break;

		case 1:
			return this.bottom;
		break;

		case 2:
			return this.right;
		break;

		case 3:
			return this.top;
		break;
	}
}

Piece.prototype.getBottom = function() {
	switch(this.rot) {
		case 0:
			return this.bottom;
		break;

		case 1:
			return this.right;
		break;

		case 2:
			return this.top;
		break;

		case 3:
			return this.left;
		break;
	}
}

Piece.prototype.getRight = function() {
	switch(this.rot) {
		case 0:
			return this.right;
		break;

		case 1:
			return this.top;
		break;

		case 2:
			return this.left;
		break;

		case 3:
			return this.bottom;
		break;
	}
}

// Tests if two pieces match
function testPieces(num1, num2) {
	switch(num1) {
		case 1:
			return num2 == 2;
		break;

		case 2:
			return num2 == 1;
		break;

		case 3:
			return num2 == 4;
		break;

		case 4:
			return num2 == 3;
		break;

		case 5:
			return num2 == 6;
		break;

		case 6:
			return num2 == 5;
		break;

		case 7:
			return num2 == 8;
		break;

		case 8:
			return num2 == 7;
		break;
	}
}

// Tests a given board
function testBoard(board, callback) {
	for(var pos=0; pos<9; ++pos) {
		var piece = board[pos]
		if(piece != null) {
			// This piece exists!

			switch(pos) {
				case top_left:
					var piece2 = board[top_middle];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}

					var piece2 = board[middle_left];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case top_middle:
					var piece2 = board[top_right];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}

					var piece2 = board[middle_middle];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case top_right:
					var piece2 = board[middle_right];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case middle_left:
					var piece2 = board[middle_middle];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}

					var piece2 = board[bottom_left];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case middle_middle:
					var piece2 = board[middle_right];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}

					var piece2 = board[bottom_middle];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case middle_right:
					var piece2 = board[bottom_right];
					if(piece2 != null) {
						if(!testPieces(piece.getBottom(), piece2.getTop())) return;
					}
				break;

				case bottom_left:
					var piece2 = board[bottom_middle];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}
				break;

				case bottom_middle:
					var piece2 = board[bottom_right];
					if(piece2 != null) {
						if(!testPieces(piece.getRight(), piece2.getLeft())) return;
					}
				break;
			}
		} else {
			// passed!
			break;
		}
	}

	// Valid board!
	callback();
}

function saveBoard(boardReference) {
	var board = {};

	for(var i=0; i<9; ++i) {
		var a = boardReference[i];
		board[i] = new Piece(a.getTop(), a.getLeft(), a.getRight(), a.getBottom());
	}

	return board;
}

function Solver() {
	// Store for the pieces
	this.pieces = [];
}

Solver.prototype.add = function(top, left, right, bottom) {
	var piece = new Piece(top, left, right, bottom);
	this.pieces.push(piece);
}

Solver.prototype.solve = function() {
	var _this = this;

	// Stores the answer
	this.answers = [];

	var posList = [
		top_left,
		top_middle,
		top_right,

		middle_left,
		middle_middle,
		middle_right,

		bottom_left,
		bottom_middle,
		bottom_right
	];

	function cont(boardReference, posNum, pieceListReference) {
		if(posNum > bottom_right) {
			console.log('Puzzle is solved!');
			_this.answers.push(saveBoard(boardReference));
			return;
		}

		// Create a new board to mess with
		var board = {};
		for(var key in boardReference) {
			board[key] = boardReference[key];
		}

		// Try each piece
		for(var i=0; i<pieceListReference.length; ++i) {
			board[posNum] = pieceListReference[i];

			// Try each angle
			for(var j=0; j<4; ++j) {
				board[posNum].rot = j;

				// Test the board
				testBoard(board, function() {
					// If we get here, it validated!

					// Create a new reference piece list

					var left = pieceListReference.slice(0, i);
					var right = pieceListReference.slice(i + 1);

					cont(board, posNum + 1, left.concat(right));
				});
			}
		}
	}

	// The board
	var board = {};

	// Do the solving
	cont(board, 0, this.pieces);
}

Solver.prototype.print = function() {
	for(var answerNumber=0; answerNumber<this.answers.length; ++answerNumber) {
		var answer = this.answers[answerNumber];

		console.log('ANSWER: ');

		for(var i=0; i< 9; ++i) {
			var piece = answer[i];

			console.log('Piece: ' + i);
			console.log(theMap[piece.getTop()]);
			console.log(theMap[piece.getLeft()]);
			console.log(theMap[piece.getRight()]);
			console.log(theMap[piece.getBottom()]);
			console.log('\n');
		}

		console.log('\n\n');
	}

	console.log('There are ' + this.answers.length + ' solutions!')
}

// Create a solver
var solver = new Solver();

// Add pieces
/*solver.add(grey_back, yellow_back, white_front, green_back);
solver.add(green_front, white_back, grey_back, yellow_back);
solver.add(green_front, grey_front, white_front, yellow_front);

solver.add(green_back, green_front, grey_back, yellow_back);
solver.add(yellow_front, grey_front, white_front, green_back);
solver.add(yellow_back, white_back, grey_back, green_front);

solver.add(yellow_front, yellow_front, grey_front, white_back);
solver.add(green_front, grey_back, white_back, yellow_front);
solver.add(green_back, white_front, yellow_back, grey_back);*/

// Fish solver
/*solver.add(horse_head, shell_dildo, fish_head, shell_star);
solver.add(shell_dildo, crab_down, horse_body, fish_body);
solver.add(horse_body, shell_dildo, crab_up, fish_head);

solver.add(crab_up, fish_body, fish_head, horse_body);
solver.add(fish_body, shell_star, crab_down, horse_head);
solver.add(horse_body, crab_down, shell_star, crab_up);

solver.add(shell_dildo, horse_body, fish_head, crab_up);
solver.add(shell_star, fish_head, horse_body, crab_up);
solver.add(shell_star, fish_body, horse_head, crab_up);*/

// Plane solver
solver.add(grey_back, yellow_back, white_front, green_back)
solver.add(yellow_front, white_front, grey_front, green_front);
solver.add(yellow_back, green_back, grey_back, white_front);

solver.add(yellow_back, white_back, grey_back, green_front);
solver.add(white_back, grey_front, yellow_front, yellow_front);
solver.add(green_back, white_front, grey_front, yellow_front);

solver.add(green_front, grey_back, white_back, yellow_front);
solver.add(yellow_back, grey_back, green_front, green_back);
solver.add(yellow_back, grey_back, white_back, green_front);

// Do the solve
solver.solve();

// Output it
solver.print();
