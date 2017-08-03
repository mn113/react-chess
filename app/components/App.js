var React = require('react');
var Switcher = require('./Switcher');
var Stats = require('./Stats');
var Buttons = require('./Buttons');
var Board = require('./Board').default;
var update = require('immutability-helper');


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: this.props.mode,
			title: "",
			subtitle: "",
			boardActive: true,
			moveCount: 0,
			gameStreak: []
		};
	}

	componentDidMount() {
		this.changeMode(this.state.mode);
	}

	changeMode(mode) {	// will be called by the Switcher
		console.log("App.changeMode sees this:", this, "and mode", mode);
		if (mode === 'hippo') {
			this.setState({
				mode: mode,
				title: "Hippodrome",
				subtitle: "A solitaire chess variation invented by Andy Lewicki in 2003"
			});
		}
		else if (mode === 'queens') {
			this.setState({
				mode: mode,
				title: "Queen's Quadrille",
				subtitle: "A solitaire chess variation by Karen Robinson, 1998"
			});
		}
	}

	incrementMoveCount() {	// will be called by Board
		this.setState({moveCount: this.state.moveCount + 1});
	}

	endGame(win = true) {	// will be called by Board
		var outcome = win ? 'Win' : 'Loss';
		console.log("Game ended in a", outcome);

		this.setState({
			boardActive: false,
			gameStreak: update(this.state.gameStreak, {$push: [outcome]})
		});
	}

	render() {
		console.log("App.render sees props:", this.props);
		// Set correct context for handler function:
		//var changeParentMode = this.changeParentMode.bind(this);
		var activeClass = this.state.boardActive ? '' : 'locked';
		var outcomeClass = this.state.gameStreak[-1] === 'W' ? 'winner' : 'loser';
		if (this.state.boardActive) outcomeClass = '';

		return (
			<div>
				<Switcher
					mode={this.state.mode}
					title={this.state.title}
					subtitle={this.state.subtitle}
					// parent methods for children to call:
					changeParentMode={this.changeMode.bind(this)}
				/>
				<Stats
					moveCount={this.state.moveCount}
					gameStreak={this.state.gameStreak}
				/>
				<Buttons
				 	activeBoard={this.state.boardActive}
					restart={this.restart.bind(this)}
				/>
				<Board
					mode={this.state.mode}
					boardClasses={activeClass+' '+outcomeClass}
					// parent methods for children to call:
					endGame={this.endGame.bind(this)}
					incrementMoveCount={this.incrementMoveCount.bind(this)}
				/>
			</div>
		);
	}
}

module.exports = App;
