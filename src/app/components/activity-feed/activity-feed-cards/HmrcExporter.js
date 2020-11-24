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

var _itemRenderers = require("./card/item-renderers");

var _CardUtils = _interopRequireDefault(require("./card/CardUtils"));

var _constants = require("../constants");

var HmrcExporter =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(HmrcExporter, _React$PureComponent);

  function HmrcExporter() {
    (0, _classCallCheck2["default"])(this, HmrcExporter);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HmrcExporter).apply(this, arguments));
  }

  (0, _createClass2["default"])(HmrcExporter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          showDetails = _this$props.showDetails;
      var startTime = (0, _lodash.get)(activity, 'object.startTime');
      var reference = (0, _lodash.get)(activity, 'object.attributedTo.name');
      var summary = (0, _lodash.get)(activity, 'summary');
      var exportItemCodes = (0, _lodash.get)(activity, 'object.dit:exportItemCodes');
      var exportItemCodesCollection = exportItemCodes.map(function (value, index) {
        var id = (0, _lodash.uniqueId)("id-".concat(index));
        return {
          id: id,
          value: value
        };
      });
      return _react["default"].createElement(_card.Card, null, _react["default"].createElement(_card.CardHeader, null, _react["default"].createElement(_card.CardHeading, {
        blockText: "HMRC",
        sourceType: _constants.SOURCE_TYPES.external,
        subHeading: "Exporters records show that",
        summary: summary
      }), _react["default"].createElement(_card.CardMeta, {
        startTime: startTime
      })), _react["default"].createElement(_card.CardDetails, {
        summary: "View key export details",
        showDetails: showDetails
      }, _react["default"].createElement(_card.CardTable, {
        rows: [{
          header: 'Company name',
          content: reference
        }, {
          header: 'Export Item code(s)',
          content: _react["default"].createElement(_card.CardDetailsList, {
            itemPropName: "value",
            itemRenderer: _itemRenderers.DefaultItemRenderer,
            items: exportItemCodesCollection
          })
        }]
      })));
    }
  }], [{
    key: "canRender",
    value: function canRender(activity) {
      return _CardUtils["default"].canRenderByTypes(activity, ['dit:Export']);
    }
  }]);
  return HmrcExporter;
}(_react["default"].PureComponent);

exports["default"] = HmrcExporter;
(0, _defineProperty2["default"])(HmrcExporter, "propTypes", {
  activity: _propTypes["default"].object.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});