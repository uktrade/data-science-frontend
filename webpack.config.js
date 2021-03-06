const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const config = require('./config')

const common = {
  devtool: 'source-map',
  entry: {
    styles: './src/public/scss/styles.scss',
    app: [
      './src/public/js/vendor/details.polyfill.js',
      './src/public/js/app.js',
    ],
    'activity-feed-app': [
      'react-app-polyfill/ie9',
      'react-app-polyfill/stable',
      './src/app/components/activity-feed/client.jsx',
    ],
  },
  output: {
    path: config.buildDir,
    publicPath: '/',

  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.(js|jsx)$/,

        // Package "hex-rgb" is not transpiled to ES5 by default so we need to transpile it again.
        // See: https://stackoverflow.com/questions/51289261/babel-does-not-transpile-imported-modules-from-node-modules
        exclude: /node_modules\/(?!(hex-rgb)\/).*/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: './babel_cache',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
      },
      {
        test: /\.(png|svg|jpe?g)$/,
        loader: [
          'file-loader?name=images/[name].[hash:8].[ext]',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: config.isDev,
                minimize: config.isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')(),
                ],
                sourceMap: config.isDev,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // required for resolve-url-loader
                includePaths: [
                  path.resolve(__dirname, 'node_modules/govuk_frontend'),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  plugins: [
    new WebpackAssetsManifest(),
  ],
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}

const webpackEnv = process.env.WEBPACK_ENV || (config.isProd ? 'prod' : 'develop')

const envConfig = require(`./webpack.config.${webpackEnv}`)
const webpackConfig = merge.smart(common, envConfig)

module.exports = webpackConfig
