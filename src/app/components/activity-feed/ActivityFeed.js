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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("@govuk-react/constants");

var _ActivityFeedCard = _interopRequireDefault(require("./ActivityFeedCard"));

var _ActivityFeedHeader = _interopRequireDefault(require("./ActivityFeedHeader"));

var _ActivityFeedFilters = _interopRequireDefault(require("./ActivityFeedFilters"));

var _ActivityFeedPagination = _interopRequireDefault(require("./ActivityFeedPagination"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  list-style-type: none;\n  padding: 0;\n  margin-top: ", ";\n  \n  & > li {\n    margin-bottom: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: ", " 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ActivityFeedContainer = (0, _styledComponents["default"])('div')(_templateObject(), _constants.SPACING.SCALE_2);
var ActivityFeedCardList = (0, _styledComponents["default"])('ol')(_templateObject2(), _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_2);

var ActivityFeed =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(ActivityFeed, _React$Component);

  function ActivityFeed(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ActivityFeed);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActivityFeed).call(this, props));
    _this.state = {
      showDetails: false
    };
    _this.onShowDetailsClick = _this.onShowDetailsClick.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ActivityFeed, [{
    key: "onShowDetailsClick",
    value: function onShowDetailsClick() {
      var showDetails = this.state.showDetails;
      this.setState({
        showDetails: !showDetails
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activities = _this$props.activities,
          onLoadMore = _this$props.onLoadMore,
          hasMore = _this$props.hasMore,
          isLoading = _this$props.isLoading,
          addContentText = _this$props.addContentText,
          addContentLink = _this$props.addContentLink,
          totalActivities = _this$props.totalActivities,
          children = _this$props.children;
      var showDetails = this.state.showDetails;
      return _react["default"].createElement(ActivityFeedContainer, null, _react["default"].createElement(_ActivityFeedHeader["default"], {
        totalActivities: totalActivities,
        addContentText: addContentText,
        addContentLink: addContentLink
      }), _react["default"].createElement(_ActivityFeedFilters["default"], {
        onShowDetailsClick: this.onShowDetailsClick,
        showDetails: showDetails
      }), _react["default"].createElement(ActivityFeedCardList, null, activities.map(function (activity) {
        return _react["default"].createElement("li", {
          key: activity.id
        }, _react["default"].createElement(_ActivityFeedCard["default"], {
          activity: activity,
          showDetails: showDetails
        }));
      })), hasMore && _react["default"].createElement(_ActivityFeedPagination["default"], {
        isLoading: isLoading,
        onLoadMore: onLoadMore
      }), children);
    }
  }]);
  return ActivityFeed;
}(_react["default"].Component);

exports["default"] = ActivityFeed;
(0, _defineProperty2["default"])(ActivityFeed, "propTypes", {
  children: _propTypes["default"].node,
  activities: _propTypes["default"].arrayOf(_propTypes["default"].object),
  onLoadMore: _propTypes["default"].func,
  hasMore: _propTypes["default"].bool,
  isLoading: _propTypes["default"].bool,
  addContentText: _propTypes["default"].string,
  addContentLink: _propTypes["default"].string,
  totalActivities: _propTypes["default"].number
});
(0, _defineProperty2["default"])(ActivityFeed, "defaultProps", {
  children: null,
  activities: [],
  onLoadMore: function onLoadMore() {},
  hasMore: false,
  isLoading: false,
  addContentText: null,
  addContentLink: null,
  totalActivities: 0
});