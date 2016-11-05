# buble-loader

This package allows you to transpile ES2015 source using [buble](https://gitlab.com/Rich-Harris/buble). See Buble project website to check out supported features.

note: This is almost-working prototype. Everything is immature. If you want something to be fixed, freely send PR or post issues!

## Installation

    npm install --save-dev buble-loader buble
    
> **Note**: This loader requires [Webpack `>=2.x`](http://webpack.js.org) (although still beta at this time) because [Buble doesn't transpile `import / export` statement](http://buble.surge.sh/guide/#using-es-modules). For more information, see [#15](https://github.com/sairion/buble-loader/issues/15).

## Usage

Add this to your `webpack.config.js`

    module: {
      loaders: [
        {
          test: /.js$/,
          loaders: 'buble',
          include: path.join(__dirname, 'src'),
          query: {
            objectAssign: 'Object.assign'
          }
        }
      ]
    }
