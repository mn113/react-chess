var React = require('react');
var Piece = require('./Piece');
var PropTypes = require('prop-types');
var update = require('immutability-helper');


class Square extends React.Component {
	constructor(props) {
		super(props);

		this.state = { queenVisited: false };
	}

	reset() {
		// Reset every square when a new board is generated
		this.setState({ queenVisited: false });
	}

	render() {
		var id = 'x'+this.props.coords.x+'y'+this.props.coords.y;
		var colour = '',
			type = '';

		if (this.props.occupier) {
			// Extract values from piecename string:
			colour = this.props.occupier.slice(0,5);
			type = this.props.occupier.slice(5);
		}

		// Highlight visited corners:
		if ([{x:0,y:0},{x:3,y:0},{x:0,y:3},{x:3,y:3}].includes(this.props.coords)) {
			if (this.props.occupier === 'whitequeen' && this.props.mode === 'queens') {
				this.setState({ queenVisited: true });
			}
		}

		return (
			<div id={id} className={this.state.queenVisited && 'queenvisited'}>
				{this.props.occupier ?
					<Piece
						coords={this.props.coords}
//						occupier={this.props.occupier}
						colour={colour}
						type={type}
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
