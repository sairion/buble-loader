'use strict'

var path = require('path')
var webpack = require('webpack')
var assert = require('assert')

var tempDir = path.resolve(__dirname, './temp/')
var loader = path.resolve(__dirname, '../')

var baseConfig = {
  entry: './test/fixtures/index.js',
  output: {
    path: tempDir,
    filename: '[id].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: loader,
        query: {
          objectAssign: 'Object.assign'
        },
        exclude: /node_modules/
      }
    ]
  }
}

webpack(baseConfig, function (err, stats) {
  if (err) throw err
  if (stats.compilation.errors.length > 0) {
    console.error(stats.compilation.errors[0].message)
    process.exit(1)
  }

  baseConfig.entry = './test/fixtures/errors.js'
  webpack(baseConfig, function (err, stats) {
    if (err) throw err
    var niceErrorMessage = [
      'ERROR in ./test/fixtures/errors.js',
      'Module build failed: ',
      '1 : // double arrow?',
      '2 : const add = (a, b) ==> 1',
      '                         ^',
      'Unexpected token (2:21)'
    ].join('\n')
    assert.ok(stats.toString().includes(niceErrorMessage), 'output contains a nice error msg')
  })
})
