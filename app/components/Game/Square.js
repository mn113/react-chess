var React = require('react');
var Piece = require('./Piece');
var PropTypes = require('prop-types');
var update = require('immutability-helper');


// The Square should not really have state or any methods
// Squares are fixed, stateless
class Square extends React.Component {
	render() {
		var id = 'x'+this.props.coords.x+'y'+this.props.coords.y;
		var colour = '',
			type = '';

		if (this.props.occupier) {
			// Extract values from piecename string:
			colour = this.props.occupier.slice(0,5);
			type = this.props.occupier.slice(5);
		}

		return (
			<div id={id}>
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
					: '0'	// empty square possibility
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
