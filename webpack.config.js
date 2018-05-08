const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV || 'development'
const CSS_MAPS = ENV !== 'production'

module.exports = {
  mode: ENV === 'production' ? 'production' : 'development',
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  context: path.join(__dirname, 'src'),
  entry: ['./App.jsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss', '.css'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
      'preact-compat': 'preact-compat/dist/preact-compat',
      'react-deep-force-update': 'preact-deep-force-update'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: CSS_MAPS,
              importLoaders: 1,
              minimize: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: CSS_MAPS
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: [
          {
            loader: ENV === 'production' ? 'file-loader' : 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    open: true,
    openPage: '',
    port: process.env.PORT || 8080,
    publicPath: '/'
  },
  stats: { colors: true },
  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: '../demo/index.ejs',
      minify: { collapseWhitespace: true }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: { warnings: false },
          mangle: true
        }
      })
    ]
  },
  performance: {
    hints: ENV === 'production' ? 'warning' : false
  }
}
