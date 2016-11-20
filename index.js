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

function transformES6Modules (input) {
    var recast = require('recast');
    var esprima = require('esprima-fb');
    var Module = require('es6-module-crosspiler');

    var ast = recast.parse(input, {
        esprima: esprima
    })
    var m = Module(ast);
    ast = m.transform(ast);
    return recast.print(ast).code;
}

module.exports = function BubleLoader(source, inputSourceMap) {
    var loaderOptions = loaderUtils.parseQuery(this.query);
    var transformed;
    try {
        transformed = buble.transform(source, Object.assign({
            transforms: {
                modules: false
            }
        }, this.options.buble, loaderOptions));

        if (parseInt(webpackPkg.version[0], 10) < 2) {
            transformed.code = transformES6Modules(transformed.code);
        }
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
