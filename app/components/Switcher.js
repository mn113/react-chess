var React = require('react');
var Headings = require('./Headings');
// prop-types?

class Switcher extends React.Component {
	constructor(props) {
		super(props);
	}

	changeChildMode() {
		console.log("Switcher.changeChildMode sees this:", this);
		// Call App's method:
		this.props.changeParentMode(this.refs.select.value);
	}

	render() {
		console.log("Switcher.render sees props:", this.props);
		var gameTypes = [
			{ mode: 'queen', title: "Queen's Quadrille" },
			{ mode: 'hippo', title: "Hippodrome" }
		];
		return (
			<div>
				<Headings title={this.props.title} subtitle={this.props.subtitle} />
				<span>Change game:</span>
				<select value={this.props.mode} ref="select" onChange={this.changeChildMode.bind(this)}>
					{gameTypes.map(game => {
						return (
							<option key={game.title} value={game.mode}>
								{game.title}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}

module.exports = Switcher;
