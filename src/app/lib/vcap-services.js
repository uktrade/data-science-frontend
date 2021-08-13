/* eslint no-console:0 */
module.exports = {

  parseRedis: function (json) {
    if (json) {
      try {
        const config = JSON.parse(json)
        return config.redis[0].credentials.uri.replace('//x:', '//')
      } catch (e) {
        console.error(e)
      }
    }
  },
}
