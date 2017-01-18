const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'main': './source/scripts/main.ts',
    // 'vendor': './source/scripts/vendor.ts',
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ]
};
