var React = require('react');
// prop-types?

// A Piece can have props: its type, 
// It won't have state though
class Piece extends React.Component {
	constructor(props) {
		super(props);
		if (props.type === 'king' || props.type === 'queen') this.validMoves = ['adjacent','diagonal'];
		else if (props.type === 'rook') this.validMoves = ['adjacent'];
		else if (props.type === 'bishop') this.validMoves = ['diagonal'];
		else if (props.type === 'knight') this.validMoves = ['dogleg'];
	}

	adjacentMove() {
		var dests = [
			{ x: this.x, y: this.y + 1 },
			{ x: this.x, y: this.y - 1 },
			{ x: this.x + 1, y: this.y },
			{ x: this.x - 1, y: this.y }
		]
		.filter(function(d) {
			// Lose out-of-bounds dests:
			return (d.x >= 1 && d.x <= 4) && (d.y >= 1 && d.y >= 4);
		})
		.filter(function(d) {
			// Lose occupied dests:
			return Board.props.hash[d.x][d.y] === '';	// TODO: ACCESS GLOBAL BOARD VAR FROM HERE
		});
		return dests;	// will be array whether empty or not
	}

	diagonalMove() {
		var dests = [
			{ x: this.x + 1, y: this.y + 1 },
			{ x: this.x + 1, y: this.y - 1 },
			{ x: this.x - 1, y: this.y + 1 },
			{ x: this.x - 1, y: this.y - 1 }
		]
		.filter(function(d) {
			// Lose out-of-bounds dests:
			return (d.x >= 1 && d.x <= 4) && (d.y >= 1 && d.y >= 4);
		})
		.filter(function(d) {
			// Lose occupied dests:
			return Board.props.hash[d.x][d.y] === '';	// TODO: ACCESS GLOBAL BOARD VAR FROM HERE
		});
		return dests;	// will be array whether empty or not
	}

	doglegMove() {
		var dests = [
			{ x: this.x + 2, y: this.y + 1 },
			{ x: this.x + 2, y: this.y - 1 },
			{ x: this.x + 1, y: this.y + 2 },
			{ x: this.x + 1, y: this.y - 2 },
			{ x: this.x - 2, y: this.y + 1 },
			{ x: this.x - 2, y: this.y - 1 },
			{ x: this.x - 1, y: this.y + 2 },
			{ x: this.x - 1, y: this.y - 2 }
		]
		.filter(function(d) {
			// Lose out-of-bounds dests:
			return (d.x >= 1 && d.x <= 4) && (d.y >= 1 && d.y >= 4);
		})
		.filter(function(d) {
			// Lose occupied dests:
			return Board.props.hash[d.x][d.y] === '';	// TODO: ACCESS GLOBAL BOARD VAR FROM HERE
		});
		return dests;	// will be array whether empty or not
	}

	movePiece() {
		this.props.movePiece(this.props.id);
	}

	render() {
		return (
			<p className={this.props.type+' '+this.props.colour}
				onClick={(me) => this.movePiece(me)}>
			</p>
		);
	}
}

module.exports = Piece;
