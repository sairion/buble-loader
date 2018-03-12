const path = require('path'),
	webpack = require('webpack'),
	assert = require('assert');

const baseConfig = {
	output: {
		path: path.resolve(__dirname, './temp/'),
		filename: '[id].js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: path.resolve(__dirname, '../'),
				options: {
					objectAssign: 'Object.assign'
				},
				exclude: /node_modules/
			}
		]
	}
};

for (let mode of ['development', 'production']) {
	baseConfig.mode = mode;
	baseConfig.entry = './test/fixtures/index.js';
	webpack(baseConfig, function (err, stats) {
		if (stats.compilation.errors.length > 0) {
			console.error(stats.compilation.errors[0].message);
			process.exit(1);
		}

		baseConfig.entry = './test/fixtures/errors.js';
		webpack(baseConfig, function (err, stats) {
			assert.ok(stats.toString().includes([
				'ERROR in ./test/fixtures/errors.js',
				'Module build failed: BubleLoaderError: ',
				'1 : // double arrow?',
				'2 : const add = (a, b) ==> 1',
				'                         ^',
				'Unexpected token (2:21)'
			].join('\n')), 'output contains a nice error msg');
		});
	});
}
