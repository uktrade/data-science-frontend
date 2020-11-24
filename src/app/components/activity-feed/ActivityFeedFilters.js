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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _govukColours = require("govuk-colours");

var _constants = require("@govuk-react/constants");

var _govukReact = require("govuk-react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledActivityFeedFilters = (0, _styledComponents["default"])('div')(_templateObject(), _govukColours.GREY_3, _constants.SPACING.SCALE_2);
var StyledLink = (0, _styledComponents["default"])(_govukReact.Link)(_templateObject2(), _constants.FONT_SIZE.SIZE_16);
StyledLink.displayName = 'ShowDetails';

var ActivityFeedFilters =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(ActivityFeedFilters, _React$PureComponent);

  function ActivityFeedFilters() {
    (0, _classCallCheck2["default"])(this, ActivityFeedFilters);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActivityFeedFilters).apply(this, arguments));
  }

  (0, _createClass2["default"])(ActivityFeedFilters, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onShowDetailsClick = _this$props.onShowDetailsClick,
          showDetails = _this$props.showDetails;

      var onClick = function onClick(e) {
        e.preventDefault();
        onShowDetailsClick();
      };

      return _react["default"].createElement(StyledActivityFeedFilters, null, _react["default"].createElement(StyledLink, {
        href: "#",
        onClick: onClick
      }, showDetails ? 'Hide' : 'Show', " details for all activities"));
    }
  }]);
  return ActivityFeedFilters;
}(_react["default"].PureComponent);

exports["default"] = ActivityFeedFilters;
(0, _defineProperty2["default"])(ActivityFeedFilters, "propTypes", {
  onShowDetailsClick: _propTypes["default"].func.isRequired,
  showDetails: _propTypes["default"].bool.isRequired
});