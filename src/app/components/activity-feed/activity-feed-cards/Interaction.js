"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _card = require("./card");

var _itemRenderers = require("./card/item-renderers");

var _CardUtils = _interopRequireDefault(require("./card/CardUtils"));

var _InteractionUtils = _interopRequireDefault(require("./InteractionUtils"));

var Interaction =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(Interaction, _React$PureComponent);

  function Interaction() {
    (0, _classCallCheck2["default"])(this, Interaction);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Interaction).apply(this, arguments));
  }

  (0, _createClass2["default"])(Interaction, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          showDetails = _this$props.showDetails;
      var transformed = (0, _objectSpread2["default"])({}, _CardUtils["default"].transform(activity), _InteractionUtils["default"].transform(activity));

      var contacts = _CardUtils["default"].getContacts(activity);

      var advisers = _CardUtils["default"].getAdvisers(activity);

      return _react["default"].createElement(_card.Card, {
        isUpcoming: transformed.isUpcoming
      }, _react["default"].createElement(_card.CardHeader, null, _react["default"].createElement(_card.CardHeading, {
        link: {
          url: transformed.url,
          text: transformed.subject
        }
      }), _react["default"].createElement(_card.CardMeta, {
        startTime: transformed.startTime,
        badge: transformed.badge
      })), _react["default"].createElement(_card.CardDetails, {
        summary: "View ".concat(transformed.typeText, " details"),
        link: {
          url: transformed.url,
          text: "Go to the ".concat(transformed.typeText, " detail page")
        },
        showDetails: showDetails
      }, _react["default"].createElement(_card.CardTable, {
        rows: [{
          header: 'Company contact(s)',
          content: _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.ContactItemRenderer,
            items: contacts
          })
        }, {
          header: 'Adviser(s)',
          content: _react["default"].createElement(_card.CardDetailsList, {
            itemRenderer: _itemRenderers.AdviserItemRenderer,
            items: advisers
          })
        }, {
          header: 'Services',
          content: transformed.service
        }]
      })));
    }
  }], [{
    key: "canRender",
    value: function canRender(activity) {
      return _CardUtils["default"].canRenderByTypes(activity, ['dit:Interaction', 'dit:ServiceDelivery']);
    }
  }]);
  return Interaction;
}(_react["default"].PureComponent);

exports["default"] = Interaction;
(0, _defineProperty2["default"])(Interaction, "propTypes", {
  activity: _propTypes["default"].object.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});