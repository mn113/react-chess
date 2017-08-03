var React = require('react');
// prop-types?

class Buttons extends React.Component {
	render() {
		var wording = this.props.activeBoard ? 'Give up' : 'New game';

		return (
			<div>
				<button onClick={this.props.restart}>{wording}</button>
			</div>
		);
	}
}

module.exports = Buttons;
