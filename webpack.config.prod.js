const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: false,
  output: {
    filename: 'js/[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
      uglifyOptions: { ecma: 8 },
      dead_code: true,
    }),
    new MiniCssExtractPlugin({ fileName: 'css/[name].css' }),
  ],
}
