var React = require('react');
// prop-types?

// The Square should not really have state or any methods
// Squares are fixed, stateless
class Square extends React.Component {
	render() {
		var piece = this.props.occupier;
		console.log("Square.render contains piece:", piece);
		return (
			<div id={'x'+this.props.x+'y'+this.props.y}>
				{piece ?
					<Piece
						type={piece.type}
						colour={piece.colour}
						id={piece.id}
						movePiece = {null} />	// TODO
					: 'e'
				}
			</div>
		);
	}
}

module.exports = Square;
