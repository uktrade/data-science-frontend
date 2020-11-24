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

var Omis =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(Omis, _React$PureComponent);

  function Omis() {
    (0, _classCallCheck2["default"])(this, Omis);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Omis).apply(this, arguments));
  }

  (0, _createClass2["default"])(Omis, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          showDetails = _this$props.showDetails;
      var published = (0, _lodash.get)(activity, 'published');
      var reference = (0, _lodash.get)(activity, 'object.name');
      var country = (0, _lodash.get)(activity, 'object.dit:country.name');
      var ukRegion = (0, _lodash.get)(activity, 'object.dit:ukRegion.name');
      var url = (0, _lodash.get)(activity, 'object.url');

      var adviser = _CardUtils["default"].getAdviser(activity);

      var contacts = _CardUtils["default"].getContacts(activity);

      return _react["default"].createElement(_card.Card, null, _react["default"].createElement(_card.CardHeader, null, _react["default"].createElement(_card.CardHeading, {
        link: {
          url: url,
          text: reference
        },
        blockText: "New Order (OMIS) added"
      }), _react["default"].createElement(_card.CardMeta, {
        startTime: published
      })), _react["default"].createElement(_card.CardDetails, {
        summary: "View key details and people for this order",
        link: {
          url: url,
          text: 'Go to the order detail page'
        },
        showDetails: showDetails
      }, _react["default"].createElement(_card.CardTable, {
        rows: [{
          header: 'Country',
          content: country
        }, {
          header: 'UK region',
          content: ukRegion
        }, {
          header: 'Added by',
          content: adviser ? _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.AdviserItemRenderer,
            items: [adviser]
          }) : null
        }, {
          header: 'Company contact(s)',
          content: _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.ContactItemRenderer,
            items: contacts
          })
        }]
      })));
    }
  }], [{
    key: "canRender",
    value: function canRender(activity) {
      return _CardUtils["default"].canRenderByTypes(activity, ['dit:OMISOrder']);
    }
  }]);
  return Omis;
}(_react["default"].PureComponent);

exports["default"] = Omis;
(0, _defineProperty2["default"])(Omis, "propTypes", {
  activity: _propTypes["default"].object.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});