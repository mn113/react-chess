var React = require('react');
// prop-types?

// A Piece can have props: its type,
// It won't have state though
class Piece extends React.Component {
	constructor(props) {
		super(props);

		if (this.props.occupier) {
			// Extract values from piecename string:
			this.colour = this.props.occupier.slice(0,5);
			this.type = this.props.occupier.slice(5);
		}

		// Determine valid moves:
		if (this.type === 'king' || this.type === 'queen') this.validMoves = ['adjacent','diagonal'];
		else if (this.type === 'rook') this.validMoves = ['adjacent'];
		else if (this.type === 'bishop') this.validMoves = ['diagonal'];
		else if (this.type === 'knight') this.validMoves = ['dogleg'];
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

	componentDidMount() {
		// Animate the piece from old {x,y} coords to current {x,y}

	}

	render() {
		//console.log("Piece.render() has this:", this);
		return (
			<p className={this.type+' '+this.colour}
				onClick={() => this.props.movePiece(this.props.occupier, this.props.coords)}>
			</p>
		);
	}
}

module.exports = Piece;
