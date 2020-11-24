"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _govukReact = require("govuk-react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("@govuk-react/constants");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: ", ";\n  margin: ", " 0 0;\n  \n  & > div {\n    padding: ", ";\n    padding-bottom: ", ";\n    margin: ", " 0 ", " 4px;\n    \n    & > a {\n      padding: ", " 0 ", " ", ";\n    }\n  }\n  \n  ", " {\n    margin-top: -", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var GovUkDetails = (0, _styledComponents["default"])(_govukReact.Details)(_templateObject(), _constants.FONT_SIZE.SIZE_16, _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_1, _constants.SPACING.SCALE_3, _constants.SPACING.SCALE_1, _constants.SPACING.SCALE_1, _constants.SPACING.SCALE_4, _constants.SPACING.SCALE_2, _constants.SPACING.SCALE_2, _constants.MEDIA_QUERIES.TABLET, _constants.SPACING.SCALE_3);

var CardDetails =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CardDetails, _React$PureComponent);

  function CardDetails() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, CardDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(CardDetails)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderLink", function (link) {
      if (!link) {
        return null;
      }

      return _react["default"].createElement(_govukReact.Link, {
        href: link.url
      }, link.text);
    });
    return _this;
  }

  (0, _createClass2["default"])(CardDetails, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          summary = _this$props.summary,
          showDetails = _this$props.showDetails,
          link = _this$props.link,
          children = _this$props.children;
      return _react["default"].createElement(GovUkDetails, {
        summary: summary,
        open: showDetails
      }, children, this.renderLink(link));
    }
  }]);
  return CardDetails;
}(_react["default"].PureComponent);

exports["default"] = CardDetails;
(0, _defineProperty2["default"])(CardDetails, "propTypes", {
  summary: _propTypes["default"].string.isRequired,
  showDetails: _propTypes["default"].bool.isRequired,
  link: _propTypes["default"].shape({
    url: _propTypes["default"].string,
    text: _propTypes["default"].string
  }),
  children: _propTypes["default"].node.isRequired
});
(0, _defineProperty2["default"])(CardDetails, "defaultProps", {
  link: null
});