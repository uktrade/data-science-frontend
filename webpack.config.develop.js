const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./config')

module.exports = {
  output: {
    filename: 'js/[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new BrowserSyncPlugin({
      port: 8081,
      proxy: `http://localhost:${config.server.port}`,
      open: false,
      files: [
        '.build/css/*.css',
        '.build/js/*.js',
        '.build/images/*',
        'src/**/*.njk',
      ],
    }, {
      reload: false,
    }),
  ],
}
