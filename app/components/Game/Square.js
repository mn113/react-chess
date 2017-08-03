var React = require('react');
var Piece = require('./Game/Piece');
var PropTypes = require('prop-types');
var update = require('immutability-helper');


// The Square should not really have state or any methods
// Squares are fixed, stateless
class Square extends React.Component {
	render() {
		var id = 'x'+this.props.coords.x+'y'+this.props.coords.y;
		return (
			<div id={id}>
				{this.props.occupier ?
					<Piece
						coords={this.props.coords}
						occupier={this.props.occupier}
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
	occupier: PropTypes.string,
	coords: PropTypes.object.isRequired,
};

module.exports = Square;
