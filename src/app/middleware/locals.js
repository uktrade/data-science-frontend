const logger = require('../lib/logger');
const config = require('../../../config');

let webpackManifest = {};

try {
  webpackManifest = require(`${config.buildDir}/manifest.json`);
} catch (err) {
  logger.error('Manifest file is not found. Ensure assets are built.');
}

module.exports = function locals (req, res, next) {
  const baseUrl = `${(req.encrypted ? 'https' : req.protocol)}://${req.get('host')}`;

  res.locals = Object.assign({}, res.locals, {
    IS_XHR: req.xhr,

    getAssetPath (asset) {
      const assetsUrl = config.assetsHost || baseUrl;
      const webpackAssetPath = webpackManifest[asset];

      if (webpackAssetPath) {
        return `${assetsUrl}/${webpackAssetPath}`;
      }

      return `${assetsUrl}/${asset}`;
    },
  });
  next();
};
