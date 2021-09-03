const merge = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.isDev,
              importLoaders: 3,
              url: (url) => {
                const files = [
                  '/assets/images/icon-pointer.png',
                  '/assets/images/icon-pointer-2x.png',
                  '/assets/images/govuk-crest.png',
                  '/assets/images/govuk-crest-2x.png',
                ]

                return !files.some((file) => url.includes(file))
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // required for resolve-url-loader
            },
          },
        ],
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
