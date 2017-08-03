var React = require('react');
// prop-types?

class Buttons extends React.Component {
	render() {
//		var wording = this.props.boardActive ? 'Give up' : 'New game';

		if (this.props.boardActive) {
			return (
				<div>
					<button onClick={this.props.finishGame}>Give up</button>
				</div>
			);
		}
		else {
			return (
				<div>
					<button onClick={this.props.newGame}>New game</button>
				</div>
			);
		}
	}
}

module.exports = Buttons;
