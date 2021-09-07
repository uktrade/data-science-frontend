module.exports = {
  sourceType: 'unambiguous',
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
  ],
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      },
    ],
  ],
}
