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

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _NumberUtils = _interopRequireDefault(require("../../utils/NumberUtils"));

var TITLES = {
  add: 'New investment project added'
};

var InvestmentProject =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(InvestmentProject, _React$PureComponent);

  function InvestmentProject() {
    (0, _classCallCheck2["default"])(this, InvestmentProject);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InvestmentProject).apply(this, arguments));
  }

  (0, _createClass2["default"])(InvestmentProject, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          showDetails = _this$props.showDetails;
      var type = (0, _lodash.get)(activity, 'type');
      var title = TITLES[type.toLowerCase()];
      var url = (0, _lodash.get)(activity, 'object.url');
      var name = (0, _lodash.get)(activity, 'object.name');
      var investmentType = (0, _lodash.get)(activity, 'object.dit:investmentType.name');

      var adviser = _CardUtils["default"].getAdviser(activity);

      var estimatedLandDate = _DateUtils["default"].format((0, _lodash.get)(activity, 'object.dit:estimatedLandDate'));

      var contacts = _CardUtils["default"].getContacts(activity); // Specific to Foreign direct investment (FDI) only


      var totalInvestment = _NumberUtils["default"].currency((0, _lodash.get)(activity, 'object.dit:totalInvestment'));

      var foreignEquityInvestment = _NumberUtils["default"].currency((0, _lodash.get)(activity, 'object.dit:foreignEquityInvestment'));

      var grossValueAdded = _NumberUtils["default"].currency((0, _lodash.get)(activity, 'object.dit:grossValueAdded'));

      var numberNewJobs = _NumberUtils["default"].decimal((0, _lodash.get)(activity, 'object.dit:numberNewJobs'));

      var published = (0, _lodash.get)(activity, 'published');
      return _react["default"].createElement(_card.Card, null, _react["default"].createElement(_card.CardHeader, null, _react["default"].createElement(_card.CardHeading, {
        link: {
          url: url,
          text: name
        },
        blockText: "".concat(title, " - ").concat(investmentType)
      }), _react["default"].createElement(_card.CardMeta, {
        startTime: published
      })), _react["default"].createElement(_card.CardDetails, {
        summary: "Key details and people for this project",
        link: {
          url: url,
          text: 'Go to the investment project detail page'
        },
        showDetails: showDetails
      }, _react["default"].createElement(_card.CardTable, {
        rows: [{
          header: 'Investment Type',
          content: investmentType
        }, {
          header: 'Added by',
          content: adviser ? _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.AdviserItemRenderer,
            items: [adviser]
          }) : null
        }, {
          header: 'Estimated land date',
          content: estimatedLandDate
        }, {
          header: 'Company contact(s)',
          content: _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.ContactItemRenderer,
            items: contacts
          })
        }, {
          header: 'Total Investment',
          content: totalInvestment
        }, {
          header: 'Capital expenditure value',
          content: foreignEquityInvestment
        }, {
          header: 'Gross value added (GVA)',
          content: grossValueAdded
        }, {
          header: 'Number of new jobs',
          content: numberNewJobs
        }]
      })));
    }
  }], [{
    key: "canRender",
    value: function canRender(activity) {
      return _CardUtils["default"].canRenderByTypes(activity, ['dit:InvestmentProject']);
    }
  }]);
  return InvestmentProject;
}(_react["default"].PureComponent);

exports["default"] = InvestmentProject;
(0, _defineProperty2["default"])(InvestmentProject, "propTypes", {
  activity: _propTypes["default"].object.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});