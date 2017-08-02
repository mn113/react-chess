var React = require('react');
var Switcher = require('./Switcher');
var Board = require('./Board').default;
// prop-types?

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'queens',
			title: "",
			subtitle: ""
		};
	}

	componentDidMount() {
		this.changeParentMode('queens');
	}

	changeParentMode(mode) {	// will be called by the Switcher
		console.log("App.changeMode sees this:", this);
		if (mode === 'hippo') {
			this.setState({
				mode: mode,
				title: "Hippodrome",
				subtitle: "A solitaire chess variation invented by Andy Lewicki in 2003"
			});
		}
		else {
			this.setState({
				mode: mode,
				title: "Queen's Quadrille",
				subtitle: "A solitaire chess variation by Karen Robinson, 1998"
			});
		}
	}

	render() {
		console.log("App.render sees props:", this.props);
		// Set correct context for handler function:
		var changeParentMode = this.changeParentMode.bind(this);
		return (
			<div>
				<Switcher
					mode={this.state.mode}
					changeParentMode={changeParentMode}
					title={this.state.title}
					subtitle={this.state.subtitle} />

				<Board mode={this.state.mode} />
			</div>
		);
	}
}

module.exports = App;
