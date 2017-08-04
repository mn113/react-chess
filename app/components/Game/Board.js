var React = require('react');
var Square = require('./Square');
var PropTypes = require('prop-types');
var _ = require('lodash');
var update = require('immutability-helper');

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

class Board extends React.Component {
	constructor(props) {
		super(props);
		// Build out board:
		var emptysquares = [];
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 4; x++) {
				emptysquares.push({
					coords: {x: x, y: y},
					occupier: null
				});
			}
		}
		// Initialise default state:
		this.state = {
			squares: emptysquares,
			empty: {
				coords: {x:0 ,y:0}
			},
			moveCount: 0,
			queenHistory: []
		};
	}

	componentDidMount() {
		// Fill a new board on every page load:
		if (this.props.mode === 'queens') this.randomFill();
		else if (this.props.mode === 'hippo') this.hippoFill();

		// Initialise white queen's history:
		if (this.props.mode === 'queens') {
			var wq = this.findPiece('whitequeen');
			this.setState({
				queenHistory: update(this.state.queenHistory, {
					$push: ['x'+wq.coords.x+'y'+wq.coords.y]
				})
			});
			console.log("White queen starts in", wq.coords);
		}
	}

	/******************/

	randomFill() {
		console.log("Board.randomFill()");
		var newSquares = [];
		// Fill randomly:
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 4; x++) {
				// Select Piece properties randomly from above array:
				var randomIndex = Math.floor(allPieces.length * Math.random()),
					randomPiece = allPieces[randomIndex];
				allPieces.splice(randomIndex, 1);

				var pieceID = randomPiece.colour+randomPiece.type;

				// Exclude black queen from being placed:
				if (randomPiece.type === 'queen' && randomPiece.colour === 'black') pieceID = null;

				// Store in new state array:
				newSquares.push({
					coords: {x: x, y: y},
					occupier: pieceID
				});
			}
		}
		this.setState({squares: newSquares}, this.findEmptySquare);
	}

	hippoFill() {
		// We want all knights in the bottom row and randomness elsewhere:
		var newSquares = [];
		var noKnights = _.clone(allPieces).filter(p => p.type !== 'knight');
		console.log(noKnights.length);

		// Fill randomly:
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 4; x++) {
				// Select Piece properties randomly from above array:
				var randomIndex = Math.floor(noKnights.length * Math.random()),
					randomPiece = noKnights[randomIndex];
				noKnights.splice(randomIndex, 1);

				var pieceID = randomPiece.colour+randomPiece.type;

				// Exclude black queen from being placed:
				if (randomPiece.type === 'queen' && randomPiece.colour === 'black') pieceID = null;

				// Store in new state array:
				newSquares.push({
					coords: {x: x, y: y},
					occupier: pieceID
				});
			}
		}
		// Fill random knights on row 3:
		y = 3;
		var knights = ['blackknight','whiteknight','blackknight','whiteknight'];
		for (x = 0; x < 4; x++) {
			newSquares.push({
				coords: {x: x, y: y},
				occupier: knights.shift()
			});
		}
		console.log(newSquares);

		// Update Board state:
		this.setState({squares: update(this.state.squares, {$set: newSquares})}, () => {
			// Callback:
			this.findEmptySquare();
			this.forceUpdate();
		});	// doesn't re-render or only renders one changed square
	}

	/******************/

	findPiece(pieceID) {
		return this.state.squares.filter(sq => sq.occupier === pieceID)[0];
	}

	findEmptySquare() {
		var empty = this.state.squares.filter(sq => sq.occupier === null)[0];
		this.setState({empty: empty}, () => {
			console.log("Empty @", empty.coords);
		});
		return empty;
	}

	movePiece(pieceID, fromCoords) {	// 'blackrook', '{x:2,y:3}'
		// Find which Square the Piece resides in:
		var origin = this.state.squares.filter(sq => {
			return (sq.coords === fromCoords);
		})[0];

		// Find empty Square:
		var empty = this.state.empty;

		console.log("Move from:", origin);
		console.log("Move to:", empty);
		this.swapPieces(origin, empty);
	}

	swapPieces(square1, square2) {
		// Deep clone our board state:
		var newBoard = _.clone(this.state.squares);
		var temp = square1.occupier;
		console.log(square1.coords, 'gets', square2.occupier);	// ok
		console.log(square2.coords, 'gets', square1.occupier);	// ok

		// Swap using array indices:
		var i = newBoard.indexOf(square1),
			j = newBoard.indexOf(square2);
		console.log("Square indices to swap",i,j);
		newBoard[i].occupier = null;	//null
		newBoard[j].occupier = temp;	//null

		// Start updating state:
		if (temp === 'whitequeen') {
			this.setState({
				queenHistory: update(this.state.queenHistory, {
					$push: ['x'+square2.coords.x+'y'+square2.coords.y]
				})
			});
		}
		this.setState({squares: newBoard}, () => {
			console.log("New board state set.");
			this.findEmptySquare();
			this.testWin();
		});

		// Run incrementor on parent App:
		this.props.incrementMoveCount();
	}

	/******************/

	testWin() {
		console.log("Testing win in", this.props.mode, "mode");
		if ((this.props.mode === 'queens' && this.testQueensWin()) ||
		(this.props.mode === 'hippo' && this.testHippoWin())) {
			// Win condition met. Call parent App:
			this.props.finishGame(true);
		}
	}

	testQueensWin() {
		// whitequeen must visit all 4 corners
		return (
			this.state.queenHistory.includes('x0y0') &&
			this.state.queenHistory.includes('x0y3') &&
			this.state.queenHistory.includes('x3y0') &&
			this.state.queenHistory.includes('x3y3')
		);
	}

	testHippoWin() {
		// Looking for first row all knights:
		return (
			this.state.squares
			.slice(0,4)
			.filter(sq => { return sq.occupier && sq.occupier.slice(5) === 'knight'; })
			.length === 4
		);
	}

	/******************/

	render() {
		return (
			<section id="board" className={this.props.boardClasses}>
				{this.state.squares.map(sq => (
					<Square
						coords={sq.coords}
						occupier={sq.occupier}
						key={'x'+sq.coords.x+'y'+sq.coords.y}
						empty={this.state.empty}
						mode={this.props.mode}
						moveCount={this.props.moveCount}
						// parent methods for children to call:
						movePiece={this.movePiece.bind(this)} />
				))}
			</section>
		);
	}
}

Board.propTypes = {
	mode: PropTypes.string,
	boardClasses: PropTypes.string,
	finishGame: PropTypes.func,
	incrementMoveCount: PropTypes.func
};

export default Board;
