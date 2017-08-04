var React = require('react');
//import hippoImg from '/hippowin.png';
//import queensImg from '/queens.png';

class Rules extends React.Component {
	render() {
		var gamename, thegoal, picSrc;

		if (this.props.mode === 'hippo') {
			gamename = "Hippodrome";
			thegoal = "<em>The goal?</em> To move your <em>four knights</em> from the bottom row to the <em>top row</em> - like this:";
			picSrc = require('./hippowin.png');
		}
		else if (this.props.mode === 'queens') {
			gamename = "Queen's Quadrille";
			thegoal = "<em>The goal?</em> To make the <em>white queen</em> <span class='queen'>♕</span> visit <em>all four corners</em> - like this:";
			picSrc = require('./queenswin.png');
		}

		return (
			<section className='rules'>
				<h3>How to play {gamename}</h3>
				<ol>
					<li>You are the only player.</li>
					<li>You control <em>both black and white</em> pieces.</li>
					<li>You have unlimited moves.</li>
					<li>No pieces can get captured or leave the board - there is always exactly <em>one empty square</em>.</li>
					<li>Movement follows the usual rules of chess. Only knights can jump.</li>
					<li dangerouslySetInnerHTML={{ __html: thegoal }}></li>
					<img src={picSrc} />
				</ol>
			</section>
		);
	}
}

module.exports = Rules;
