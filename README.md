# buble-loader

This package allows you to transpile ES2015 source using [buble](https://gitlab.com/Rich-Harris/buble). See Buble project website to check out supported features.

note: This is almost-working prototype. Everything is immature. If you want something to be fixed, freely send PR or post issues!

## Installation

    npm install buble-loader buble --save-dev

## Usage

Example `webpack.config.js` snippet with both Bublé and Rollup:

    module: {
      loaders: [
        {
          loaders: ['buble', 'rollup'],
          include: path.join(__dirname, 'src')
        }
        // , .....
      ]
    }