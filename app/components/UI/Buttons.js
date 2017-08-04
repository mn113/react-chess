var React = require('react');
// prop-types?

class Buttons extends React.Component {
	constructor(props) {
		super(props);
	}

	loseGame() {
		// Callback to App:
		this.props.finishGame(false);
	}

	render() {
		if (this.props.boardActive) {
			return (
				<div>
					<button onClick={() => this.props.finishGame(false)}>Give up</button>
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
