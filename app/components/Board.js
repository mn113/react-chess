var React = require('react');
var Square = require('./Square');
var Piece = require('./Piece');
var _ = require('lodash');
//var immutable = require('immutability-helper');
import update from 'immutability-helper';
// prop-types?

class Board extends React.Component {
	constructor(props) {
		super(props);
		// Build out board:
		var emptysquares = [];
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				emptysquares.push({
					x: x,
					y: y,
					occupier: null
				});
			}
		}
		this.state = {
			squares: emptysquares
		};
	}

	componentDidMount() {
		this.randomFill();
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
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				// Select Piece properties randomly from above array:
				var randomIndex = Math.floor(allPieces.length * Math.random()),
					randomPiece = allPieces[randomIndex];
				allPieces.splice(randomIndex, 1);

				var pieceID = randomPiece.colour+randomPiece.type+'-x'+x+'y'+y;

				// Exclude black queen from being placed:
				if (randomPiece.type === 'queen' && randomPiece.colour === 'black') pieceID = null;
				console.log(pieceID);

				// Store in new state array: //BUG
				newSquares.push({
					x: x,
					y: y,
					occupier: pieceID
				});
			}
		}
		console.log("newSquares:", newSquares);
		this.setState({squares: newSquares});
		//newArray = update(initialArray, {$push: [4]})
		console.log(this.state);	// only nulls!
	}

	findEmpty() {
		return _.flatten(this.state.squares).filter(sq => sq.props.occupier === null)[0];
	}

	findParentSquare(pieceID) {
		console.log("Finding", pieceID);
		return _.flatten(this.state.squares).filter(sq => sq.props.occupier && (sq.props.occupier.props.id === pieceID))[0];
	}

	movePiece(pieceID) {
		// Find which Square the Piece resides in:
		var origin = this.findParentSquare(pieceID);
		// Find empty Square:
		var empty = this.findEmpty();
		// Check move validity...
		console.log(origin.props, empty.props);
		this.swapPieces(origin, empty);
	}

	swapPieces(square1, square2) {
		//var newBoard = _.clone(this.state.squares);
		console.log("Swapping...");
		//console.log([square1.props.x, square1.props.y], 'gets', square2.props.occupier);
		//console.log([square2.props.x, square2.props.y], 'gets', square1.props.occupier);

		var piece1 = square1.props.occupier;
		var piece2 = square2.props.occupier;
		update(this.state.squares[square1.props.x][square1.props.y].props.occupier, {$set: piece2});
		update(this.state.squares[square2.props.x][square2.props.y].props.occupier, {$set: piece1});

		//newBoard[square1.props.x][square1.props.y].props.occupier = 7;//square2.props.occupier;
		//newBoard[square2.props.x][square2.props.y].props.occupier = 'c';//square1.props.occupier;
		//console.log(newBoard[square1.props.x][square1.props.y]);	// NOT NULL

		//this.setState({
		//	squares: newBoard
		//});
		console.log("New board state set.");
	}

	//qqWin() {}

	//hippoWin() {}

	render() {
		console.log("Board.render() running with state", this.state);
		console.log(this.state.squares.map(sq => { return [sq.x, sq.y] }));
		return (
			<div id="board">
				{this.state.squares.map(sq => (
					<Square x={sq.x} y={sq.y} occupier={sq.occupier} key={'x'+sq.x+'y'+sq.y} />
				))}
			</div>
		);
	}
}

export default Board;
