var React = require('react');
var PropTypes = require('prop-types');
var Headings = require('./Headings');


class Switcher extends React.Component {
	constructor(props) {
		super(props);
	}

	changeChildMode() {
		console.log("Switcher.changeChildMode sees this:", this);
		// Call App's method:
		this.props.changeMode(this.refs.select.value);
	}

	render() {
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

Switcher.propTypes = {
	mode: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string
};

module.exports = Switcher;
