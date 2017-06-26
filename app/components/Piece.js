var React = require('react');
// prop-types?

class Piece extends React.Component {
	constructor(type, colour = 'white') {
		super();
		this.type = type;
		this.colour = colour;
		this.parent = null;
		if (type === 'king' || type === 'queen') this.validMoves = ['adjacent','diagonal'];
		else if (type === 'rook') this.validMoves = ['adjacent'];
		else if (type === 'bishop') this.validMoves = ['diagonal'];
		else if (type === 'knight') this.validMoves = ['dogleg'];
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

	highlightDests() {

	}

	makeMove(dest) {
		if (dest.props.occupier === '') {
			// Empty parent Square:
			this.parent.empty();
			// Fill dest Square:
			dest.fill(this);
		}
	}

	render() {
		return (
			<p className={this.props.type+' '+this.props.colour}
				onClick={this.makeMove}>
			</p>
		);
	}
}

module.exports = Piece;
