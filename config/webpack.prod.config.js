const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

const appEntryPoint = path.join(__dirname, '../src/scripts/app/index.js');
const outputPath = path.join(__dirname, '../build/assets/js/');
const reportPath = path.join(__dirname, '../reports/plain-report.txt');
const filename = 'bundle.min.js';

const devTool = false;
// 'hidden-source-map';

// devTool = 'inline-source-map';
console.log('\n ---- WEBPACK ----\n \n running in production \n');

console.log(path.join(' running webpack in ', __dirname));
console.log(' filename: ' + filename);
console.log(' devTool: ' + devTool);
console.log(' outputPath path ' + outputPath + '\n');

const entryPoints = appEntryPoint;

module.exports = {
	node: {
		fs: 'empty',
	},
	mode: 'production',
	entry: entryPoints,

	// if multiple outputs, use [name] and it will use the name of the entry point, and loop through them
	output: {
		path:       outputPath,
		filename:   filename,
		publicPath: 'assets/js/',
	},

	optimization: {
		noEmitOnErrors: true,
		concatenateModules: true,
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions:{
					compress: {
						drop_console: true,
						warnings: false,
					},
					ie8: false,
					keep_classnames: false,
					keep_fnames: false,
					output: {
						comments: false,
					},
				},
			}),
		],
	},

	plugins: [
		new webpack.DefinePlugin({
				 'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new WebpackBundleSizeAnalyzerPlugin(reportPath),
	],

	// make 'zepto' resolve to your local copy of the library
	// i. e. through the resolve.alias option
	// will be included in the bundle, no need to add and load vendor
	resolve: {
		extensions: ['.js', '.json', '.twig', '.html'],
		modules: [
			'src/scripts/app/',
			'src/scripts/vendors/',
			'shared/',
			'public/assets/',
			'node_modules',
		],
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader',
			},
			{test: /\.twig$/, use: 'twig-loader'},
		],
	},

	stats: {
		// Nice colored output
		colors: true,
	},

	// Create Sourcemaps for the bundle
	devtool: devTool,

};
