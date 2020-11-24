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

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _govukReact = require("govuk-react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("@govuk-react/constants");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  text-align: center;\n  margin-top: ", ";\n  margin-bottom: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Pagination = (0, _styledComponents["default"])('div')(_templateObject(), _constants.SPACING.SCALE_5, _constants.SPACING.SCALE_6);

var ActivityFeedPagination =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(ActivityFeedPagination, _React$Component);

  function ActivityFeedPagination() {
    (0, _classCallCheck2["default"])(this, ActivityFeedPagination);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActivityFeedPagination).apply(this, arguments));
  }

  (0, _createClass2["default"])(ActivityFeedPagination, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onLoadMore = _this$props.onLoadMore,
          isLoading = _this$props.isLoading;
      return _react["default"].createElement(Pagination, null, _react["default"].createElement(_govukReact.LoadingBox, {
        loading: isLoading,
        backgroundColorOpacity: 1,
        timeOut: 0
      }, _react["default"].createElement(_govukReact.Button, {
        disabled: isLoading,
        onClick: onLoadMore,
        buttonColour: "#dee0e2",
        buttonTextColour: "#000"
      }, "Show more activity")));
    }
  }]);
  return ActivityFeedPagination;
}(_react["default"].Component);

exports["default"] = ActivityFeedPagination;
(0, _defineProperty2["default"])(ActivityFeedPagination, "propTypes", {
  onLoadMore: _propTypes["default"].func,
  isLoading: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(ActivityFeedPagination, "defaultProps", {
  onLoadMore: function onLoadMore() {},
  isLoading: false
});