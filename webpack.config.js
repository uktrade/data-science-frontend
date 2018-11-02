const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const config = require('./config')

const common = {
  devtool: 'source-map',
  entry: {
    // styles: './src/public/scss/styles.scss',
    app: [
      './src/public/js/app.js',
    ],
  },
  output: {
    // path: config.buildDir,
    path: path.resolve(__dirname, 'public'),
    // publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: './babel_cache',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
                import: false,
                url: false,
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
              loader: 'fast-sass-loader',
              options: {
                sourceMap: true, // required for resolve-url-loader
                includePaths: [
                  path.resolve(__dirname, 'libs'),
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
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
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
