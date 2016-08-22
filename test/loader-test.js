'use strict';

var fs = require('fs');
var path = require('path');
var assign = require('object-assign');
var webpack = require('webpack');

var tempDir = path.resolve(__dirname, './temp/');
var loader = path.resolve(__dirname, '../');

var baseConfig = {
  entry: './test/fixtures/index.js',
  output: {
    path: tempDir,
    filename: '[id].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: loader,
        exclude: /node_modules/,
      },
    ],
  },
};

webpack(baseConfig, function(err, stats) {
  if (stats.compilation.errors.length > 0) {
    console.error(stats.compilation.errors[0].message);
    process.exit(1);
  }
});
