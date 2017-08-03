var React = require('react');

class Stats extends React.Component {
	render() {
		return (
			<div>
				<p>Moves: <span>{this.props.moveCount}</span></p>
				<p>Streak: <span>{this.props.gameStreak}</span></p>
			</div>
		);
	}
}

module.exports = Stats;
