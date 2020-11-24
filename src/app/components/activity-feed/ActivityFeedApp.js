"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActivityFeed = _interopRequireDefault(require("./ActivityFeed"));

var ActivityFeedApp =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(ActivityFeedApp, _React$Component);

  function ActivityFeedApp(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ActivityFeedApp);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActivityFeedApp).call(this, props));
    _this.state = {
      activities: [],
      isLoading: true,
      hasMore: true,
      offset: 0,
      total: 0,
      error: false
    };
    _this.onLoadMore = _this.onLoadMore.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ActivityFeedApp, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.onLoadMore();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onLoadMore",
    value: function () {
      var _onLoadMore = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var _this$state, activities, offset, _this$props, apiEndpoint, queryParams, limit, _ref, newActivities, total, allActivities;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$state = this.state, activities = _this$state.activities, offset = _this$state.offset;
                _this$props = this.props, apiEndpoint = _this$props.apiEndpoint, queryParams = _this$props.queryParams;
                limit = 20;
                this.setState({
                  isLoading: true
                });
                _context2.prev = 4;
                _context2.next = 7;
                return ActivityFeedApp.fetchActivities(apiEndpoint, offset, limit, queryParams);

              case 7:
                _ref = _context2.sent;
                newActivities = _ref.activities;
                total = _ref.total;
                allActivities = activities.concat(newActivities);
                this.setState({
                  activities: allActivities,
                  isLoading: false,
                  hasMore: total > allActivities.length,
                  offset: offset + limit,
                  total: total
                });
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                this.setState({
                  isLoading: false,
                  hasMore: false,
                  error: true
                });

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 14]]);
      }));

      function onLoadMore() {
        return _onLoadMore.apply(this, arguments);
      }

      return onLoadMore;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          activities = _this$state2.activities,
          isLoading = _this$state2.isLoading,
          hasMore = _this$state2.hasMore,
          total = _this$state2.total,
          error = _this$state2.error;
      var _this$props2 = this.props,
          addContentText = _this$props2.addContentText,
          addContentLink = _this$props2.addContentLink,
          render = _this$props2.render;
      var isEmptyFeed = activities.length === 0 && !hasMore;
      return _react["default"].createElement(_ActivityFeed["default"], {
        totalActivities: total,
        addContentText: addContentText,
        addContentLink: addContentLink,
        activities: activities,
        hasMore: hasMore,
        onLoadMore: this.onLoadMore,
        isLoading: isLoading
      }, isEmptyFeed && !error && _react["default"].createElement("div", null, "There are no activities to show."), error && _react["default"].createElement("div", null, "Error occurred while loading activities."), render && render(this.state, this.props));
    }
  }], [{
    key: "fetchActivities",
    value: function () {
      var _fetchActivities = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(apiEndpoint, offset, limit) {
        var queryParams,
            params,
            _ref2,
            data,
            _data$hits,
            total,
            hits,
            _args3 = arguments;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryParams = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                params = (0, _objectSpread2["default"])({
                  size: limit,
                  from: offset
                }, queryParams);
                _context3.next = 4;
                return _axios["default"].get(apiEndpoint, {
                  params: params
                });

              case 4:
                _ref2 = _context3.sent;
                data = _ref2.data;
                _data$hits = data.hits, total = _data$hits.total, hits = _data$hits.hits;
                return _context3.abrupt("return", {
                  total: total,
                  activities: hits.map(function (hit) {
                    return hit._source;
                  })
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function fetchActivities(_x, _x2, _x3) {
        return _fetchActivities.apply(this, arguments);
      }

      return fetchActivities;
    }()
  }]);
  return ActivityFeedApp;
}(_react["default"].Component);

exports["default"] = ActivityFeedApp;
(0, _defineProperty2["default"])(ActivityFeedApp, "propTypes", {
  apiEndpoint: _propTypes["default"].string.isRequired,
  queryParams: _propTypes["default"].object,
  addContentText: _propTypes["default"].string,
  addContentLink: _propTypes["default"].string,
  render: _propTypes["default"].func
});
(0, _defineProperty2["default"])(ActivityFeedApp, "defaultProps", {
  queryParams: {},
  addContentText: null,
  addContentLink: null,
  render: null
});