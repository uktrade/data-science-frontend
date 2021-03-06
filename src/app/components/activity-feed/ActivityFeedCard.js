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

var _activityFeedCards = _interopRequireDefault(require('./activity-feed-cards'))

var ActivityFeedCard =
/* #__PURE__ */
(function (_React$PureComponent) {
  (0, _inherits2.default)(ActivityFeedCard, _React$PureComponent)

  function ActivityFeedCard (props) {
    var _this;

    (0, _classCallCheck2.default)(this, ActivityFeedCard)
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ActivityFeedCard).call(this, props))
    var activity = _this.props.activity
    _this.Card = (0, _lodash.find)(_activityFeedCards.default, function (c) {
      return c.canRender(activity)
    })
    return _this
  }

  (0, _createClass2.default)(ActivityFeedCard, [{
    key: 'render',
    value: function render () {
      var _this$props = this.props
      var activity = _this$props.activity
      var showDetails = _this$props.showDetails
      var Card = this.Card
      return Card ? _react.default.createElement(Card, {
        activity: activity,
        showDetails: showDetails,
      }) : null
    },
  }])
  return ActivityFeedCard
}(_react.default.PureComponent))

exports.default = ActivityFeedCard;
(0, _defineProperty2.default)(ActivityFeedCard, 'propTypes', {
  activity: _propTypes.default.object.isRequired,
  showDetails: _propTypes.default.bool.isRequired,
})
