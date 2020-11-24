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

var _react = _interopRequireDefault(require('react'))

var _lodash = require('lodash')

var _propTypes = _interopRequireDefault(require('prop-types'))

var _card = require('./card')

var _itemRenderers = require('./card/item-renderers')

var _CardUtils = _interopRequireDefault(require('./card/CardUtils'))

var _DateUtils = _interopRequireDefault(require('../utils/DateUtils'))

var _constants = require('../constants')

var CompaniesHouseCompany =
/* #__PURE__ */
(function (_React$PureComponent) {
  (0, _inherits2.default)(CompaniesHouseCompany, _React$PureComponent)

  function CompaniesHouseCompany () {
    (0, _classCallCheck2.default)(this, CompaniesHouseCompany)
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CompaniesHouseCompany).apply(this, arguments))
  }

  (0, _createClass2.default)(CompaniesHouseCompany, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var activity = _this$props.activity
      var showDetails = _this$props.showDetails
      var startTime = (0, _lodash.get)(activity, 'object.startTime')
      var reference = (0, _lodash.get)(activity, 'object.name')
      var summary = (0, _lodash.get)(activity, 'summary')
      var address = (0, _lodash.get)(activity, 'object.location:dit:address')
      var postcode = (0, _lodash.get)(activity, 'object.location:dit:postcode')

      var confStmtLastMadeUpDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:confStmtLastMadeUpDate'))

      var confStmtNextDueDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:confStmtNextDueDate'))

      var incorporationDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:incorporationDate'))

      var nextDueDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:nextDueDate'))

      var returnsLastMadeUpDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:returnsLastMadeUpDate'))

      var returnsNextDueDate = _DateUtils.default.format((0, _lodash.get)(activity, 'object.dit:returnsNextDueDate'))

      var sicCodes = (0, _lodash.get)(activity, 'object.dit:sicCodes')
      var sicCodesCollection = sicCodes.map(function (value, index) {
        var id = (0, _lodash.uniqueId)('id-'.concat(index))
        return {
          id: id,
          value: value,
        }
      })
      return _react.default.createElement(_card.Card, null, _react.default.createElement(_card.CardHeader, null, _react.default.createElement(_card.CardHeading, {
        blockText: 'Companies House',
        sourceType: _constants.SOURCE_TYPES.external,
        subHeading: 'Company records show that',
        summary: summary,
      }), _react.default.createElement(_card.CardMeta, {
        startTime: startTime,
      })), _react.default.createElement(_card.CardDetails, {
        summary: 'View key details for this company',
        showDetails: showDetails,
      }, _react.default.createElement(_card.CardTable, {
        rows: [{
          header: 'Company name',
          content: reference,
        }, {
          header: 'Address',
          content: address,
        }, {
          header: 'Postcode',
          content: postcode,
        }, {
          header: 'Confirmation Statement last made up date',
          content: confStmtLastMadeUpDate,
        }, {
          header: 'Confirmation Statement next due date',
          content: confStmtNextDueDate,
        }, {
          header: 'Incorporation date',
          content: incorporationDate,
        }, {
          header: 'Next due date',
          content: nextDueDate,
        }, {
          header: 'Returns last made up date',
          content: returnsLastMadeUpDate,
        }, {
          header: 'Returns next due date',
          content: returnsNextDueDate,
        }, {
          header: 'SIC code(s)',
          content: _react.default.createElement(_card.CardDetailsList, {
            itemPropName: 'value',
            itemRenderer: _itemRenderers.DefaultItemRenderer,
            items: sicCodesCollection,
          }),
        }],
      })))
    },
  }], [{
    key: 'canRender',
    value: function canRender (activity) {
      return _CardUtils.default.canRenderByTypes(activity, ['dit:Company'])
    },
  }])
  return CompaniesHouseCompany
}(_react.default.PureComponent))

exports.default = CompaniesHouseCompany;
(0, _defineProperty2.default)(CompaniesHouseCompany, 'propTypes', {
  activity: _propTypes.default.object.isRequired,
  showDetails: _propTypes.default.bool.isRequired,
})
