const HtmlWebPackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public')
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  }
}
