var React = require('react');
// prop-types?

class Headings extends React.Component {
	render() {
		return (
			<div>
				<h2>{this.props.title}</h2>
				<h3>{this.props.subtitle}</h3>
			</div>
		);
	}
}

module.exports = Headings;
