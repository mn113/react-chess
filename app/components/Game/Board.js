var React = require('react');
var Square = require('./Game/Square');
var PropTypes = require('prop-types');
var _ = require('lodash');
var update = require('immutability-helper');


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
		this.randomFill();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.shouldReload && nextProps.shouldReload) {
			// Begin new game:
			this.randomFill();
		}
	}

	randomFill() {
		console.log("Board.randomFill()");
		var newSquares = [];
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
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 4; x++) {
				// Select Piece properties randomly from above array:
				var randomIndex = Math.floor(allPieces.length * Math.random()),
					randomPiece = allPieces[randomIndex];
				allPieces.splice(randomIndex, 1);

				var pieceID = randomPiece.colour+randomPiece.type;//+'-x'+x+'y'+y;

				// Exclude black queen from being placed:
				if (randomPiece.type === 'queen' && randomPiece.colour === 'black') pieceID = null;

				// Store in new state array: //BUG
				newSquares.push({
					coords: {x: x, y: y},
					occupier: pieceID
				});
			}
		}
		this.setState({squares: newSquares}, this.findEmptySquare);
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
		console.log("Indices",i,j);
		newBoard[i].occupier = null;	//null
		newBoard[j].occupier = temp;	//null

		// Start updating state:
		if (temp === 'whitequeen') {
			this.setState({queenHistory: update(this.state.queenHistory, {$push: [square2.coords]})});
		}
		this.setState({squares: newBoard}, () => {
			this.findEmptySquare();
			this.testWin();
		});
		console.log("New board state set.");

		// Run incrementor on parent App:
		this.props.incrementMoveCount();
	}

	testWin() {
		if ((this.state.mode === 'queens' && this.testQueensWin()) ||
		(this.state.mode === 'hippo' && this.testHippoWin())) {
			// Win condition met. Call parent App:
			this.props.endGame(true);
		}
	}

	testQueensWin() {
		// whitequeen must visit all 4 corners
		return (
			this.state.queenHistory.includes({x:0,y:0}) &&
			this.state.queenHistory.includes({x:0,y:3}) &&
			this.state.queenHistory.includes({x:3,y:0}) &&
			this.state.queenHistory.includes({x:3,y:3})
		);
	}

	testHippoWin() {
		// Looking for first row all knights:
		return (
			this.state.squares
			.slice(0,4)
			.filter(sq => { return sq.occupier.slice(5) === 'knight'; })
			.length === 4
		);
	}

	render() {
		return (
			<div id="board" className={this.props.boardClasses}>
				{this.state.squares.map(sq => (
					<Square
						coords={sq.coords}
						occupier={sq.occupier}
						key={'x'+sq.coords.x+'y'+sq.coords.y}
						empty={this.state.empty}
						mode={this.props.mode}
						// parent methods for children to call:
						movePiece={this.movePiece.bind(this)} />
				))}
			</div>
		);
	}
}

Board.propTypes = {
	mode: PropTypes.string
};

export default Board;