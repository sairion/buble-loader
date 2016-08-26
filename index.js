'use strict';

var buble = require('buble');
var path = require('path');
var assign = require('object-assign');

module.exports = function BubleLoader(source, inputSourceMap) {
    var options = {
        transforms: {
            modules: false
        },
        objectAssign: 'Object.assign'
    };

    if (this.options.buble) {
        assign(options, this.options.buble);
    }

    try {
        var transformed = buble.transform(source, options);
    } catch (e) {
        this.emitError(e);
        return '';
    }

    var resourcePath = this.resourcePath;

    transformed.map.file = resourcePath;
    transformed.map.sources[0] = path.relative(process.cwd(), resourcePath);
    transformed.map.sourceRoot = process.cwd();

    this.cacheable && this.cacheable();
    this.callback(null, transformed.code, transformed.map);
};
