var React = require('react');
var Piece = require('./Piece');
var PropTypes = require('prop-types');
var update = require('immutability-helper');


class Square extends React.Component {
	constructor(props) {
		super(props);

		this.id = 'x'+this.props.coords.x+'y'+this.props.coords.y;
		this.state = { queenVisited: false };
	}

	componentWillReceiveProps(nextProps) {
		// Force a re-render if square occupier changed:
		if (this.props !== nextProps) {
			this.forceUpdate();
		}

		// Highlight a corner if visited by queen:
		if (this.props.mode === 'queens') {
			if (['x0y0','x3y0','x0y3','x3y3'].includes(this.id)) {
				if (nextProps.occupier === 'whitequeen') {
					console.warn(nextProps.occupier, "registered in", this.props.coords);
					// This state will persist until board is reset:
					this.setState({ queenVisited: true });
				}
			}
		}

		// If new board started, reset corners:
		if (nextProps.moveCount === 0) {
			//console.log(nextProps);
			this.resetVisits();
		}

	}

	resetVisits() {
		// Reset every square when a new board is generated
		this.setState({ queenVisited: false });
		//console.log("Just reset visited corners");
	}

	render() {
		this.colour = '';
		this.type = '';

		if (this.props.occupier) {
			// Extract values from piecename string:
			this.colour = this.props.occupier.slice(0,5);
			this.type = this.props.occupier.slice(5);
		}

		return (
			<div id={this.id} className={this.state.queenVisited && 'queenvisited'}>
				{this.props.occupier ?
					<Piece
						coords={this.props.coords}
						colour={this.colour}
						type={this.type}
						empty={this.props.empty}
						mode={this.props.mode}
						movePiece={this.props.movePiece}
					/>
					: ''	// empty square possibility
				}
			</div>
		);
	}
}

Square.propTypes = {
	coords: PropTypes.object.isRequired,
	occupier: PropTypes.string,
	empty: PropTypes.object,
	mode: PropTypes.string,
	movePiece: PropTypes.func
};

module.exports = Square;
