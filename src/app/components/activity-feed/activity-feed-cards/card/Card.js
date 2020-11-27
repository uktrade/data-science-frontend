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

var _propTypes = _interopRequireDefault(require('prop-types'))

var _govukColours = require('govuk-colours')

function _templateObject () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  border: ', ';\n  padding: ', ';\n'])

  _templateObject = function _templateObject () {
    return data
  }

  return data
}

var CardContainer = (0, _styledComponents.default)('div')(_templateObject(), function (_ref) {
  var isUpcoming = _ref.isUpcoming
  return isUpcoming ? '1px dashed '.concat(_govukColours.GREY_2) : '1px solid '.concat(_govukColours.GREY_2)
}, _constants.SPACING.SCALE_3)

var Card =
/* #__PURE__ */
(function (_React$PureComponent) {
  (0, _inherits2.default)(Card, _React$PureComponent)

  function Card () {
    (0, _classCallCheck2.default)(this, Card)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Card).apply(this, arguments))
  }

  (0, _createClass2.default)(Card, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var isUpcoming = _this$props.isUpcoming
      var children = _this$props.children
      return _react.default.createElement(CardContainer, {
        isUpcoming: isUpcoming,
      }, children)
    },
  }])
  return Card
}(_react.default.PureComponent))

exports.default = Card;
(0, _defineProperty2.default)(Card, 'propTypes', {
  isUpcoming: _propTypes.default.bool,
  children: _propTypes.default.node,
});
(0, _defineProperty2.default)(Card, 'defaultProps', {
  isUpcoming: false,
  children: null,
})
