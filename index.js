'use strict';

var buble = require('buble');

module.exports = function BubleLoader(source, inputSourceMap) {
    var transformed = buble.transform(source, {
        transforms: {
            modules: false
        }
    });

    this.cacheable && this.cacheable();

    return transformed.code;
};
