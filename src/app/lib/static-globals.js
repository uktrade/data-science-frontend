const config = require('../../../config')

module.exports = function (env) {
  env.addGlobal('analyticsId', config.analyticsId)
  env.addGlobal('googleTagManagerKey', config.googleTagManagerKey)
  env.addGlobal('feedbackLink', `${config.datahubDomain}/support`)
  env.addGlobal('headerLink', `${config.datahubDomain}/`)
  env.addGlobal('profileLink', `${config.datahubDomain}/profile`)
}
