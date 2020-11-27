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

function _templateObject () {
  var data = (0, _taggedTemplateLiteral2.default)(['\n  margin-bottom: ', ';\n  \n  & > tbody > tr > th, td  {\n    font-weight: normal;\n    border: 0;\n    padding: ', ';\n    font-size: 16px;\n    vertical-align: top;\n  }\n'])

  _templateObject = function _templateObject () {
    return data
  }

  return data
}

var GovUkTable = (0, _styledComponents.default)(_govukReact.Table)(_templateObject(), _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_2)

var DetailsRow =
/* #__PURE__ */
(function (_React$PureComponent) {
  (0, _inherits2.default)(DetailsRow, _React$PureComponent)

  function DetailsRow () {
    (0, _classCallCheck2.default)(this, DetailsRow)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DetailsRow).apply(this, arguments))
  }

  (0, _createClass2.default)(DetailsRow, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var header = _this$props.header
      var children = _this$props.children

      if (!children) {
        return null
      }

      return _react.default.createElement(_govukReact.Table.Row, null, _react.default.createElement(_govukReact.Table.CellHeader, {
        style: {
          fontWeight: 'normal',
          border: 0,
        },
      }, header), _react.default.createElement(_govukReact.Table.Cell, {
        style: {
          border: 0,
        },
      }, children))
    },
  }])
  return DetailsRow
}(_react.default.PureComponent));

(0, _defineProperty2.default)(DetailsRow, 'propTypes', {
  header: _propTypes.default.string.isRequired,
  children: _propTypes.default.node,
});
(0, _defineProperty2.default)(DetailsRow, 'defaultProps', {
  children: null,
})

var CardTable =
/* #__PURE__ */
(function (_React$Component) {
  (0, _inherits2.default)(CardTable, _React$Component)

  function CardTable () {
    (0, _classCallCheck2.default)(this, CardTable)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardTable).apply(this, arguments))
  }

  (0, _createClass2.default)(CardTable, [{
    key: 'render',
    value: function render () {
      var rows = this.props.rows
      return _react.default.createElement(GovUkTable, null, rows.map(function (_ref) {
        var header = _ref.header
        var content = _ref.content
        return _react.default.createElement(DetailsRow, {
          header: header,
          key: header,
        }, content)
      }))
    },
  }])
  return CardTable
}(_react.default.Component))

exports.default = CardTable;
(0, _defineProperty2.default)(CardTable, 'propTypes', {
  rows: _propTypes.default.arrayOf(_propTypes.default.shape({
    header: _propTypes.default.string,
    content: _propTypes.default.node,
  })).isRequired,
})
