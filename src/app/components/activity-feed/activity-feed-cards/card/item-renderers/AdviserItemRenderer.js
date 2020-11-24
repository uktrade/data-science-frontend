'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _govukReact = require('govuk-react')

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var AdviserItemRenderer = function AdviserItemRenderer (item) {
  var name = _react.default.createElement('span', null, item.name)

  var emailAddress = _react.default.createElement(_govukReact.Link, {
    href: 'mailto:'.concat(item.emailAddress),
  }, ' ', item.emailAddress)

  var team = item.team ? ', ('.concat(item.team, ')') : null
  return _react.default.createElement(_react.default.Fragment, null, name, ', ', emailAddress, team)
}

AdviserItemRenderer.propTypes = {
  adviser: _propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    emailAddress: _propTypes.default.string.isRequired,
    team: _propTypes.default.string, // Only available for Interactions

  }).isRequired,
}
var _default = AdviserItemRenderer
exports.default = _default
