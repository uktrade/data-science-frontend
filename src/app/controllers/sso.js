const uuid = require('uuid/v4')
const request = require('request')
const config = require('../../../config')
const logger = require('../lib/logger')

const axios = require('axios')

const isAlpha = /^[a-zA-Z0-9-]+$/

const urls = ['auth', 'token'].reduce((params, param) => {
  params[param] = `${config.sso.protocol}://${config.sso.domain}:${config.sso.port}${config.sso.path[param]}`

  return params
}, {})

async function getSSOIntrospect (token) {
  const options = {
    headers: { 'Authorization': 'Bearer ' + config.sso.accessToken },
  }

  const data = await axios.get(
    `https://sso.trade.gov.uk/o/introspect/?token=${token}`,
    options,
  ).then((response) => response.data)
    .catch((error) => error)

  return JSON.stringify(data)
}

function stringify (params) {
  const arr = []
  for (let paramKey in params) {
    arr.push(`${paramKey}=${encodeURIComponent(params[paramKey])}`)
  }

  return arr.join('&')
}

function checkCallbackErrors (errorParam, stateParam, codeParam, stateId) {
  if (errorParam) {
    return `Error with SSO: ${errorParam}`
  }

  if (stateParam !== stateId) {
    return `StateId mismatch: '${stateParam}' !== '${stateId}'`
  }

  if (stateParam.length > config.sso.paramLength) {
    return ('State param too long: ' + stateParam.length)
  }

  if (!isAlpha.test(stateParam)) {
    return 'Invalid state param'
  }

  if (codeParam.length > config.sso.paramLength) {
    return ('Code param too long' + codeParam.length)
  }

  if (!isAlpha.test(codeParam)) {
    return 'Invalid code param'
  }
}

module.exports = {
  authRedirect: (req, res, next) => {
    const stateId = uuid()
    const urlParams = {
      response_type: 'code',
      client_id: config.sso.client,
      redirect_uri: config.sso.redirectUri,
      state: stateId,
      idp: 'cirrus',
    }

    if (config.sso.mockCode) {
      urlParams.code = config.sso.mockCode
    }

    req.session.oauthStateId = stateId // used to check the callback received contains matching state param
    req.session.save((err) => {
      if (err) { next(err) }

      logger.info('Session saved to redis')
      res.redirect(`${urls.auth}?${stringify(urlParams)}`)
    })
  },

  callback: (req, res, next) => {
    const errorParam = req.query.error
    const stateParam = req.query.state
    const codeParam = req.query.code
    const stateId = req.session.oauthStateId
    const errMessage = checkCallbackErrors(errorParam, stateParam, codeParam, stateId)

    if (errMessage) {
      logger.error(errMessage)
      next(errMessage)
    }

    request({
      method: 'POST',
      url: urls.token,
      formData: {
        code: codeParam,
        grant_type: 'authorization_code',
        client_id: config.sso.client,
        client_secret: config.sso.secret,
        redirect_uri: config.sso.redirectUri,
      },
      json: true,

    }, async (err, response, data) => {
      if (err) {
        logger.error('Error with SSO token request')
        logger.error(err)
        next(err)
      }

      if (data.access_token) {
        req.session.ssoToken = data.access_token
        req.session.introspect = await getSSOIntrospect(data.access_token)

        delete req.session.oauthStateId
        res.redirect(req.session.returnPath || '/')
      } else {
        next(err)
      }
    })
  },

  signOutOAuth: function (req, res) {
    req.session = null
    res.clearCookie('connect.sid')
    res.redirect(config.sso.logoutUrl)
  },
}
