/* eslint-disable no-invalid-this */
const buble = require('buble'),
	path = require('path'),
	loaderUtils = require('loader-utils');

class BubleError extends Error {
	constructor(err) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = 'BubleLoaderError';
		this.message = ['', err.snippet, err.message].join('\n');
		this.error = err;
	}
}

module.exports = function(source) {
	const config = loaderUtils.getOptions(this) || {};
	config.transforms = Object.assign({}, config.transforms || {}, { modules: false });
	let output;
	try {
		output = buble.transform(source, config);
	}
	catch (err) {
		throw err.name === 'CompileError' || err.name === 'SyntaxError' ? new BubleError(err) : err;
	}

	const resourcePath = this.resourcePath;

	output.map.file = resourcePath;
	output.map.sources[0] = path.relative(process.cwd(), resourcePath);
	output.map.sourceRoot = process.cwd();

	if (this.cacheable) this.cacheable();
	this.callback(null, output.code, output.map);
};
