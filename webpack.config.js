var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./app/index.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					}
				}]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'url-loader',
				options: {
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})],
	devtool: 'cheap-module-inline-source-map'
};
