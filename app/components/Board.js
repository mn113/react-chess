var React = require('react');
var Square = require('./Square');
var Piece = require('./Piece');
// prop-types?

class Board extends React.Component {
	constructor() {
		super();
		this.hash = [
			[ 1,2,3,4 ],	// values will be overwritten with Pieces
			[ 5,6,7,8 ],	// Squares need to stay in sync with this state
			[ 9,10,11,12 ],
			[ 13,14,15,16 ]
		];
		this.squares = [];	// flat array of squares
//		console.log(this.hash[2][0]);
		this.randomFill();
//		console.log(this.hash[2][0]);
	}

	randomFill() {
		const allPieces = [
			{type: 'king', 'colour': 'black'},
			{type: 'king', 'colour': 'white'},
			{type: 'queen', 'colour': 'black'},
			{type: 'queen', 'colour': 'white'},
			{type: 'rook', 'colour': 'black'},
			{type: 'rook', 'colour': 'black'},
			{type: 'rook', 'colour': 'white'},
			{type: 'rook', 'colour': 'white'},
			{type: 'bishop', 'colour': 'black'},
			{type: 'bishop', 'colour': 'black'},
			{type: 'bishop', 'colour': 'white'},
			{type: 'bishop', 'colour': 'white'},
			{type: 'knight', 'colour': 'black'},
			{type: 'knight', 'colour': 'black'},
			{type: 'knight', 'colour': 'white'},
			{type: 'knight', 'colour': 'white'}
		];
		// Fill randomly:
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				// Select Piece properties randomly from above array:
				var randomIndex = Math.floor(allPieces.length * Math.random()),
					randomPiece = allPieces[randomIndex];
				allPieces.splice(randomIndex, 1);

				// Instantiate Piece & load into Board hash:
				var piece = (
					<Piece type={randomPiece.type} colour={randomPiece.colour} />
				);
				// Exclude black queen from being placed:
				if (randomPiece.type === 'queen' && randomPiece.colour === 'black') piece = null;

				//this.hash[x][y] = (
				this.squares.push(
					<Square
						x={x}
						y={y}
						occupier={piece}
						key={'x'+x+'y'+y}
						ref={instance => { this.child = instance; }}
						>
						{piece}
					</Square>
				);
			}
		}
	}

	//qqWin() {}

	//hippoWin() {}

	render() {
		return (
			<div id="board">{this.squares}</div>
		);
	}
}

module.exports = Board;
