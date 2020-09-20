const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
     rules: [
       {test: /\.(js)$/, use:'babel-loader'},
       {test: /\.css$/, use: ['style-loader', 'css-loader']}
     ]

  },
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin()
  ]



};

module.exports = webpackConfig;