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

var _propTypes = _interopRequireDefault(require('prop-types'))

var _govukReact = require('govuk-react')

var _styledComponents = _interopRequireDefault(require('styled-components'))

var _constants = require('@govuk-react/constants')

var _pluralise = _interopRequireDefault(require('pluralise'))

function _templateObject4 () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  margin-bottom: 0;\n'])

  _templateObject4 = function _templateObject4 () {
    return data
  }

  return data
}

function _templateObject3 () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  text-align: right;\n  \n  & > Button {\n    margin-bottom: 0;\n  }\n'])

  _templateObject3 = function _templateObject3 () {
    return data
  }

  return data
}

function _templateObject2 () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  margin-top: ', ';\n  \n  & > H2 {\n    font-weight: normal;\n    font-size: 28px;\n    margin-bottom: 0;\n  }\n'])

  _templateObject2 = function _templateObject2 () {
    return data
  }

  return data
}

function _templateObject () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  display: flex;\n  flex-flow: row wrap;\n  border-bottom: 2px solid #000;\n  margin-bottom: ', ';\n  padding-bottom: ', ';\n  \n  & > div {\n    width: 100%;\n    margin-bottom: ', ';\n    \n    ', ' {\n      width: 0;\n      flex-grow: 1;\n    }\n  }\n'])

  _templateObject = function _templateObject () {
    return data
  }

  return data
}

var HeaderSummary = (0, _styledComponents.default)('div')(_templateObject(), _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_1, _constants.SPACING.SCALE_1, _constants.MEDIA_QUERIES.TABLET)
var HeaderCount = (0, _styledComponents.default)('div')(_templateObject2(), _constants.SPACING.SCALE_1)
var HeaderActions = (0, _styledComponents.default)('div')(_templateObject3())

var Link = _styledComponents.default.a(_templateObject4())

var ActivityFeedHeader =
/* #__PURE__ */
(function (_React$Component) {
  (0, _inherits2.default)(ActivityFeedHeader, _React$Component)

  function ActivityFeedHeader () {
    (0, _classCallCheck2.default)(this, ActivityFeedHeader)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ActivityFeedHeader).apply(this, arguments))
  }

  (0, _createClass2.default)(ActivityFeedHeader, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var totalActivities = _this$props.totalActivities
      var addContentText = _this$props.addContentText
      var addContentLink = _this$props.addContentLink

      var headerText = _pluralise.default.withCount(totalActivities, '% activity', '% activities', 'Activities')

      var showAddContentButton = addContentText && addContentLink
      return _react.default.createElement(HeaderSummary, null, _react.default.createElement(HeaderCount, null, _react.default.createElement(_govukReact.H2, null, headerText)), _react.default.createElement(HeaderActions, null, showAddContentButton && _react.default.createElement(_govukReact.Button, {
        as: Link,
        href: addContentLink,
        buttonColour: '#dee0e2',
        buttonTextColour: '#000',
      }, addContentText)))
    },
  }])
  return ActivityFeedHeader
}(_react.default.Component))

exports.default = ActivityFeedHeader;
(0, _defineProperty2.default)(ActivityFeedHeader, 'propTypes', {
  totalActivities: _propTypes.default.number,
  addContentText: _propTypes.default.string,
  addContentLink: _propTypes.default.string,
});
(0, _defineProperty2.default)(ActivityFeedHeader, 'defaultProps', {
  totalActivities: 0,
  addContentText: null,
  addContentLink: null,
})
