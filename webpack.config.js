const path = require('path')
const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: ENV === 'production' ? 'production' : 'development',
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  context: path.join(__dirname, 'src'),
  entry: ['./index.jsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: [path.join(__dirname, 'node_modules')]
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    publicPath: '/',
    contentBase: './',
    historyApiFallback: true,
    open: true,
    openPage: 'demo'
  }
}
