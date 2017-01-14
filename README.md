# buble-loader

This package allows you to transpile ES2015 source using [buble](https://gitlab.com/Rich-Harris/buble). See Buble project website to check out supported features.

note: This is almost-working prototype. Everything is immature. If you want something to be fixed, freely send PR or post issues!

## Installation
```bash
npm install --save-dev buble-loader buble
```
## Usage

Add this to your `webpack.config.js`
```js
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
```
