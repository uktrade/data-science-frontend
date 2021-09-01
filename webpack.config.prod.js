const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: false,
  output: {
    filename: 'js/[name].js',
  },
  optimization: { sideEffects: false },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),

    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  ],
}
