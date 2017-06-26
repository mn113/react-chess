var React = require('react');
// prop-types?

class Square extends React.Component {
	constructor(x, y, occupier = null) {
		super();
		this.x = x;
		this.y = y;
		this.occupier = occupier;
	}

	fill(piece) {
		this.occupier = piece;
	}

	empty() {
		this.occupier = null;
	}

	render() {
		return (
			<div id={'x'+this.props.x+'y'+this.props.y}>
				{this.props.occupier}
			</div>
		);
	}
}

module.exports = Square;
