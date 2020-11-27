/* eslint-disable no-func-assign */
'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _possibleConstructorReturn2 = _interopRequireDefault(require('@babel/runtime/helpers/possibleConstructorReturn'))

var _getPrototypeOf2 = _interopRequireDefault(require('@babel/runtime/helpers/getPrototypeOf'))

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'))

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

var _taggedTemplateLiteral2 = _interopRequireDefault(require('@babel/runtime/helpers/taggedTemplateLiteral'))

var _react = _interopRequireDefault(require('react'))

var _styledComponents = _interopRequireDefault(require('styled-components'))

var _constants = require('@govuk-react/constants')

var _govukColours = require('govuk-colours')

var _propTypes = _interopRequireDefault(require('prop-types'))

var _DateUtils = _interopRequireDefault(require('../../utils/DateUtils'))

function _templateObject3 () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  border: ', ';\n  border-radius: 4px;\n  padding: 2px 4px;\n  font-size: ', ';\n'])

  _templateObject3 = function _templateObject3 () {
    return data
  }

  return data
}

function _templateObject2 () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  padding: ', ' 0 ', ';\n  display: inline;\n  margin-left: 5px;\n  \n  ', ' {\n    display: block;\n  }\n'])

  _templateObject2 = function _templateObject2 () {
    return data
  }

  return data
}

function _templateObject () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  width: 100%;\n  margin-bottom: ', ';\n  font-size: ', ';\n  \n  ', ' {\n    width: 200px;\n    text-align: right;\n  }\n'])

  _templateObject = function _templateObject () {
    return data
  }

  return data
}

var CardMetaContainer = (0, _styledComponents.default)('div')(_templateObject(), _constants.SPACING.SCALE_1, _constants.FONT_SIZE.SIZE_16, _constants.MEDIA_QUERIES.TABLET)
var CardBadges = (0, _styledComponents.default)('div')(_templateObject2(), _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_2, _constants.MEDIA_QUERIES.TABLET)
var Badge = (0, _styledComponents.default)('span')(_templateObject3(), function (_ref) {
  var borderColour = _ref.borderColour
  return '2px solid '.concat(borderColour || _govukColours.GREY_2)
}, _constants.FONT_SIZE.SIZE_14)

var CardMeta =
/* #__PURE__ */
(function (_React$PureComponent) {
  (0, _inherits2.default)(CardMeta, _React$PureComponent)

  function CardMeta () {
    (0, _classCallCheck2.default)(this, CardMeta)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardMeta).apply(this, arguments))
  }

  (0, _createClass2.default)(CardMeta, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var startTime = _this$props.startTime
      var badge = _this$props.badge
      var cardBadge = badge ? _react.default.createElement(CardBadges, null, _react.default.createElement(Badge, {
        borderColour: badge.borderColour,
      }, badge.text)) : null
      return _react.default.createElement(CardMetaContainer, null, _DateUtils.default.format(startTime), cardBadge)
    },
  }])
  return CardMeta
}(_react.default.PureComponent))

exports.default = CardMeta;
(0, _defineProperty2.default)(CardMeta, 'propTypes', {
  startTime: _propTypes.default.string.isRequired,
  badge: _propTypes.default.shape({
    text: _propTypes.default.string,
    borderColour: _propTypes.default.string,
  }),
});
(0, _defineProperty2.default)(CardMeta, 'defaultProps', {
  badge: null,
})
