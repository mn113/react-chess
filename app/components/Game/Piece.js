var React = require('react');
var PropTypes = require('prop-types');
var update = require('immutability-helper');


// A Piece can have props: its type, its colour, its current coords.
// It won't have state though
class Piece extends React.Component {
	constructor(props) {
		super(props);
	}

	relationToEmptySquare() {
		var dx = Math.abs(this.props.coords.x - this.props.empty.coords.x),
			dy = Math.abs(this.props.coords.y - this.props.empty.coords.y);
		return {dx: dx, dy:dy};
	}

	canMove() {
		// Check if this piece has a valid move to empty square.
		var rel = this.relationToEmptySquare();

		// DogLeg move?
		if (this.props.type === 'knight' && (rel.dx === 2 && rel.dy === 1 || rel.dx === 1 && rel.dy === 2)
		)
			return true;
		// Diagonal move?
		else if (['bishop','king','queen'].includes(this.props.type) && rel.dx === 1 && rel.dy === 1)
			return true;
		// Lateral move?
		else if (['rook','king','queen'].includes(this.props.type) && (rel.dx === 1 && rel.dy === 0 || rel.dx === 0 && rel.dy === 1))
			return true;
		// No valid moves.
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
		// Style final-place pieces:
		var finalClass = (this.props.mode === 'hippo' && this.props.type === 'knight' && this.props.coords.y === 0) ? 'final' : '';
		var validMoveClass = this.canMove() ? 'valid' : 'invalid';

		return (
			<p className={this.props.type+' '+this.props.colour+' '+validMoveClass+' '+finalClass}
				onClick={() => this.props.movePiece(this.props.colour+this.props.type, this.props.coords)}>
			</p>
		);
	}
}

Piece.propTypes = {
	coords: PropTypes.object.isRequired,
//	occupier: PropTypes.string,
	colour: PropTypes.string,
	type: PropTypes.string,
	empty: PropTypes.object,
	mode: PropTypes.string,
	movePiece: PropTypes.func
};

module.exports = Piece;
