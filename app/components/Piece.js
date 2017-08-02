var React = require('react');
var PropTypes = require('prop-types');


// A Piece can have props: its type, its colour, its current coords.
// It won't have state though
class Piece extends React.Component {
	constructor(props) {
		super(props);

		if (this.props.occupier) {
			// Extract values from piecename string:
			this.colour = this.props.occupier.slice(0,5);
			this.type = this.props.occupier.slice(5);
		}
	}

	relationToEmptySquare() {
		var dx = Math.abs(this.props.coords.x - this.props.empty.coords.x),
			dy = Math.abs(this.props.coords.y - this.props.empty.coords.y);
		return {dx: dx, dy:dy};
	}

	canMove() {
		// Check if this piece can make a valid move to empty.
		var rel = this.relationToEmptySquare();
		console.log(this.props.coords, this.props.empty.coords, rel, this.type);
		// DogLeg?
		if (this.type === 'knight' && (rel.dx === 2 && rel.dy === 1 || rel.dx === 1 && rel.dy === 2)
		)
			return true;
		// Diagonal?
		else if (['bishop','king','queen'].includes(this.type) && rel.dx === 1 && rel.dy === 1)
			return true;
		// Lateral?
		else if (['rook','king','queen'].includes(this.type) && (rel.dx === 1 && rel.dy === 0 || rel.dx === 0 && rel.dy === 1))
			return true;
		else {
			return false;
		}
	}

/*
	adjacentMoves() {
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

	diagonalMoves() {
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

	doglegMoves() {
		var here = this.props.coords;
		var dests = [
			{ x: here.x + 2, y: here.y + 1 },
			{ x: here.x + 2, y: here.y - 1 },
			{ x: here.x + 1, y: here.y + 2 },
			{ x: here.x + 1, y: here.y - 2 },
			{ x: here.x - 2, y: here.y + 1 },
			{ x: here.x - 2, y: here.y - 1 },
			{ x: here.x - 1, y: here.y + 2 },
			{ x: here.x - 1, y: here.y - 2 }
		]
		// Lose out-of-bounds dests:
		.filter(d => (d.x >= 1 && d.x <= 4) && (d.y >= 1 && d.y >= 4))
		.filter(function(d) {
			// Lose occupied dests:
			return Board.props.hash[d.x][d.y] === '';	// TODO: ACCESS GLOBAL BOARD VAR FROM HERE
		});
		return dests;	// will be array whether empty or not
	}
*/
	//componentDidMount() {
		// Animate the piece from old {x,y} coords to current {x,y}
	//}

	render() {
		//console.log("Piece.render() has this:", this);
		var validMoveClass = this.canMove() ? 'valid' : 'invalid';
		return (
			<p className={this.type+' '+this.colour+' '+validMoveClass}
				onClick={() => this.props.movePiece(this.props.occupier, this.props.coords)}>
			</p>
		);
	}
}

Piece.propTypes = {
	occupier: PropTypes.string,
	coords: PropTypes.object.isRequired,
};

module.exports = Piece;
