var React = require('react');
var Switcher = require('./UI/Switcher');
var Stats = require('./UI/Stats');
var Buttons = require('./UI/Buttons');
var Board = require('./Game/Board').default;
var update = require('immutability-helper');


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'hippo',
			boardActive: true,
			reloadBoard: false,
			moveCount: 0,
			gameStreak: [],
			winCount: 0,
			lossCount: 0
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
		this.newGame();
	}

	/****************/

	incrementMoveCount() {	// will be called by Board
		this.setState({moveCount: this.state.moveCount + 1});
	}

	/****************/

	finishGame(win = false) {
		var outcome = win ? 'Win' : 'Loss';
		console.log("App.finishGame() called with a", outcome);

		// Freeze board first:
		this.setState({
			boardActive: false,
			didWinMsg: win,
			gameStreak: update(this.state.gameStreak, {$push: [outcome]})
		});

		// Increment wins/losses:
		// Wait for input if winner, reset board if quitter:
		if (win) {
			this.setState({winCount: this.state.winCount + 1});
			// App.newGame is called by clicking 'New game' button
		}
		else {
			this.setState({lossCount: this.state.lossCount + 1});
			this.newGame();
		}
	}

	newGame() {
		// Trigger a board reset:
		this.setState({
			boardActive: true,
			didWinMsg: false,
		});
		this.board.componentDidMount();
	}

	/****************/

	render() {
		//console.log("App.render sees props:", this.props);
		// Set correct context for handler function:
		var activeClass = this.state.boardActive ? '' : 'locked';
		var outcomeClass = this.state.gameStreak[this.state.gameStreak.length-1] === 'Win' ? 'winner' : 'loser';
		if (this.state.boardActive) outcomeClass = '';

		return (
			<div>
				<Switcher
					mode={this.state.mode}
					// parent methods for children to call:
					changeMode={this.changeMode.bind(this)}
				/>
				<Stats
					moveCount={this.state.moveCount}
					winCount={this.state.winCount}
					lossCount={this.state.lossCount}
					gameStreak={this.state.gameStreak}
					didWinMsg={this.state.didWinMsg}
				/>
				<Buttons
				 	boardActive={this.state.boardActive}
					// parent methods for children to call:
					finishGame={this.finishGame.bind(this)}
					newGame={this.newGame.bind(this)}
				/>
				<Board
					mode={this.state.mode}
					boardClasses={activeClass+' '+outcomeClass}
					//shouldReload={this.state.reloadBoard}
					// define a ref to child:
					ref={(board) => { this.board = board; }}
					// parent methods for children to call:
					finishGame={this.finishGame.bind(this)}
					//turnOffReloadTrigger={this.turnOffReloadTrigger.bind(this)}
					incrementMoveCount={this.incrementMoveCount.bind(this)}
				/>
			</div>
		);
	}
}

module.exports = App;
