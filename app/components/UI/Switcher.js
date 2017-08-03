var React = require('react');
var PropTypes = require('prop-types');
var Headings = require('./Headings');


class Switcher extends React.Component {
	constructor(props) {
		super(props);
	}

	changeChildMode() {
		console.log("Switcher.changeChildMode sees this:", this);
		// Change App's mode by calling parent method:
		this.props.changeMode(this.refs.select.value);
	}

	render() {
		// Static store:
		const gameTypes = [
			{
				mode: 'queens',
				title: "Queen's Quadrille",
				subtitle: "A solitaire chess variation by Karen Robinson, 1998"
			},
			{
				mode: 'hippo',
				title: "Hippodrome",
				subtitle: "A solitaire chess variation invented by Andy Lewicki in 2003"
		 	}
		];
		// Select current game mode data:
		var game = gameTypes.filter(g => g.mode === this.props.mode)[0];
		return (
			<div>
				<Headings
					title={game.title}
					subtitle={game.subtitle}
				/>
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

Switcher.propTypes = {
	mode: PropTypes.string,
	changeMode: PropTypes.func
};

module.exports = Switcher;
