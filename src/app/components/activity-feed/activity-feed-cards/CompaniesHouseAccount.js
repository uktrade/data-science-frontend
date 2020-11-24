"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _card = require("./card");

var _CardUtils = _interopRequireDefault(require("./card/CardUtils"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _NumberUtils = _interopRequireDefault(require("../../utils/NumberUtils"));

var _constants = require("../constants");

var CompaniesHouseAccount =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CompaniesHouseAccount, _React$PureComponent);

  function CompaniesHouseAccount() {
    (0, _classCallCheck2["default"])(this, CompaniesHouseAccount);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CompaniesHouseAccount).apply(this, arguments));
  }

  (0, _createClass2["default"])(CompaniesHouseAccount, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          showDetails = _this$props.showDetails;
      var startTime = (0, _lodash.get)(activity, 'object.startTime');
      var reference = (0, _lodash.get)(activity, 'object.name');
      var taxonomy = (0, _lodash.get)(activity, 'dit:taxonomy');
      var summary = (0, _lodash.get)(activity, 'summary');

      var balanceSheetDate = _DateUtils["default"].format((0, _lodash.get)(activity, 'object.dit:balanceSheetDate'));

      var netAssetsLiabilities = _NumberUtils["default"].currency((0, _lodash.get)(activity, 'object.dit:netAssetsLiabilitiesIncludingPensionAssetLiability'));

      var periodEnd = _DateUtils["default"].format((0, _lodash.get)(activity, 'object.dit:periodEnd'));

      var periodStart = _DateUtils["default"].format((0, _lodash.get)(activity, 'object.dit:periodStart'));

      var shareholderFunds = _NumberUtils["default"].currency((0, _lodash.get)(activity, 'object.dit:shareholderFunds'));

      return _react["default"].createElement(_card.Card, null, _react["default"].createElement(_card.CardHeader, null, _react["default"].createElement(_card.CardHeading, {
        link: {
          taxonomy: taxonomy,
          text: reference
        },
        blockText: "Companies House",
        sourceType: _constants.SOURCE_TYPES.external,
        subHeading: "Accounts records show that",
        summary: summary
      }), _react["default"].createElement(_card.CardMeta, {
        startTime: startTime
      })), _react["default"].createElement(_card.CardDetails, {
        summary: "View key details for this account",
        link: {
          taxonomy: taxonomy,
          text: 'Go to the Companies House accounts page'
        },
        showDetails: showDetails
      }, _react["default"].createElement(_card.CardTable, {
        rows: [{
          header: 'Balance sheet date',
          content: balanceSheetDate
        }, {
          header: 'Net assets liabilities including pension asset liability',
          content: netAssetsLiabilities
        }, {
          header: 'Period start',
          content: periodStart
        }, {
          header: 'Period end',
          content: periodEnd
        }, {
          header: 'Shareholder funds',
          content: shareholderFunds
        }]
      })));
    }
  }], [{
    key: "canRender",
    value: function canRender(activity) {
      return _CardUtils["default"].canRenderByTypes(activity, ['dit:Accounts']);
    }
  }]);
  return CompaniesHouseAccount;
}(_react["default"].PureComponent);

exports["default"] = CompaniesHouseAccount;
(0, _defineProperty2["default"])(CompaniesHouseAccount, "propTypes", {
  activity: _propTypes["default"].object.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});