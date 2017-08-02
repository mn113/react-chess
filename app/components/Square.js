var React = require('react');
var Piece = require('./Piece');

// prop-types?

// The Square should not really have state or any methods
// Squares are fixed, stateless
class Square extends React.Component {
	render() {
		var piece = null;
		if (this.props.occupier) {
			// Extract values from piecename string:
			piece = {
				colour: this.props.occupier.slice(0,5),
				type: this.props.occupier.slice(5, this.props.occupier.indexOf('-'))
			};
		}
		console.log("Square.render contains piece:", piece);
		return (
			<div id={'x'+this.props.x+'y'+this.props.y}>
				{piece ?
					<Piece
						type={piece.type}
						colour={piece.colour}
						id={piece.id}
						movePiece = {null} />	// TODO
					: ''
				}
			</div>
		);
	}
}

module.exports = Square;
