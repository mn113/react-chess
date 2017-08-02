var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
require('./styles.css');

// How to set mode here?
ReactDOM.render(<App mode="hippo" />, document.getElementById('app'));
