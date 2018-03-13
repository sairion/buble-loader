# buble-loader

This package allows you to transpile ES2015 source using [buble](https://github.com/Rich-Harris/buble). See [Buble project website](https://buble.surge.sh/guide/) to check out supported features.

## Installation
```bash
npm i -S buble-loader buble
```
## Usage

Add something like this to your `webpack.config.js`
```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'buble-loader',
      include: path.join(__dirname, 'src'),
      options: {
        objectAssign: 'Object.assign'
      }
    }
  ]
}
```
