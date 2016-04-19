'use strict';

var buble = require('buble');

module.exports = function BubleLoader(source, inputSourceMap) {
    var transformed = buble.transform(source);

    this.cacheable && this.cacheable();
    this.value = source;

    return transformed.code;
};
