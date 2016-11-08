'use strict';

var buble = require('buble');
var path = require('path');
var loaderUtils = require('loader-utils');
var webpackPkg = require('webpack/package');

function BubleError (err) {
  Error.call(this);
  Error.captureStackTrace(this, BubleError);

  this.name = 'BubleLoaderError';
  this.message = ['', err.snippet, err.message].join('\n');
  this.hideStack = true;
  this.error = err;
}

BubleError.prototype = Object.create(Error.prototype);
BubleError.prototype.constructor = BubleError;

function handleError (err) {
    if (err.name === 'CompileError' || err.name === 'SyntaxError') {
        throw new BubleError(err);
    } else {
        throw err;
    }
}

module.exports = function BubleLoader(source, inputSourceMap) {
    // Warning for Webpack 1 users
    // @see https://github.com/sairion/buble-loader/issues/15
    if (parseInt(webpackPkg.version[0], 10) < 2) {
        console.log([
          '[WARNING]: It appears that you are using Webpack 1.',
          'Buble doesn\'t transpile import/export statements.',
          'To transpile import/export statements, you must upgrade to Webpack 2.'
         ].join(' '));
    }
  
    var loaderOptions = loaderUtils.parseQuery(this.query);
    var transformed;
    try {
        transformed = buble.transform(source, Object.assign({
            transforms: {
                modules: false
            }
        }, this.options.buble, loaderOptions));
    } catch (err) {
        handleError(err);
    }

    var resourcePath = this.resourcePath;

    transformed.map.file = resourcePath;
    transformed.map.sources[0] = path.relative(process.cwd(), resourcePath);
    transformed.map.sourceRoot = process.cwd();

    this.cacheable && this.cacheable();
    this.callback(null, transformed.code, transformed.map);
};
