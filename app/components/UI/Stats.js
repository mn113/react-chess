var React = require('react');

class Stats extends React.Component {
	render() {
		var streak = this.props.gameStreak.map(g => g.slice(0,1));
		return (
			<div>
				<p>Wins: {this.props.winCount} Losses: {this.props.lossCount}</p>
				{ streak.length > 0 && <p>Streak: <span>{streak.join('-')}</span></p>}
				<p>Moves: <span>{this.props.moveCount}</span></p>
				{ this.props.didWinMsg && <p className='winMsg'>You won!</p> }
			</div>
		);
	}
}

module.exports = Stats;
