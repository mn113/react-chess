var React = require('react');
var Switcher = require('./Switcher');
var Board = require('./Board');
// prop-types?

class App extends React.Component {
	render() {
		return (
			<Switcher />
			<Board />
		);
	}
}

module.exports = App;

<h2>Queen's Quadrille</h2>
<h3>A solitaire chess variation by Karen Robinson, 1998</h3>
