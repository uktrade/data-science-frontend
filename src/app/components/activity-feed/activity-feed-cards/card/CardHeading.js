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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("@govuk-react/constants");

var _govukReact = require("govuk-react");

var _govukColours = require("govuk-colours");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CardHeadingBlock = _interopRequireDefault(require("./CardHeadingBlock"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: normal;\n  font-size: ", "px;\n  margin-left: ", "px;\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: normal;\n  font-size: ", "px;\n  color: #393939;\n  \n  ", " {\n    margin-bottom: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: normal;\n  font-size: ", "px;\n  color: ", ";\n  \n  & > a:link, a:visited, a:hover, a:active {\n    text-decoration: none;\n  }\n  \n  ", " {\n    margin-bottom: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  \n  ", " {\n    width: 0;\n    flex-grow: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var HeadingContainer = (0, _styledComponents["default"])('div')(_templateObject(), _constants.MEDIA_QUERIES.TABLET);
var Heading = (0, _styledComponents["default"])(_govukReact.H3)(_templateObject2(), _constants.HEADING_SIZES.MEDIUM, _govukColours.BLUE, _constants.MEDIA_QUERIES.TABLET, _constants.SPACING.SCALE_5);
var StyledActivitySummary = (0, _styledComponents["default"])(_govukReact.H3)(_templateObject3(), _constants.HEADING_SIZES.MEDIUM, _constants.MEDIA_QUERIES.TABLET, _constants.SPACING.SCALE_5);
var StyledSubHeading = (0, _styledComponents["default"])('span')(_templateObject4(), _constants.BODY_SIZES.MEDIUM, _constants.SPACING_POINTS['1'], _govukColours.GREY_1);

var CardHeading =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CardHeading, _React$PureComponent);

  function CardHeading() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, CardHeading);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(CardHeading)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderActivitySummary", function (summary) {
      if (!summary) {
        return null;
      }

      return _react["default"].createElement(StyledActivitySummary, null, summary);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderSubHeading", function (data) {
      if (!data) {
        return null;
      }

      return _react["default"].createElement(StyledSubHeading, null, data);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderLinkHeading", function (link) {
      if (!link) {
        return null;
      }

      return _react["default"].createElement(Heading, null, _react["default"].createElement(_govukReact.Link, {
        href: link.url
      }, link.text));
    });
    return _this;
  }

  (0, _createClass2["default"])(CardHeading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          link = _this$props.link,
          blockText = _this$props.blockText,
          subHeading = _this$props.subHeading,
          sourceType = _this$props.sourceType,
          summary = _this$props.summary;
      var cardHeadingBlock = blockText ? _react["default"].createElement(_CardHeadingBlock["default"], {
        sourceType: sourceType,
        text: blockText
      }) : null;
      return _react["default"].createElement(HeadingContainer, null, cardHeadingBlock, " ", this.renderSubHeading(subHeading), this.renderActivitySummary(summary), this.renderLinkHeading(link));
    }
  }]);
  return CardHeading;
}(_react["default"].PureComponent);

exports["default"] = CardHeading;
(0, _defineProperty2["default"])(CardHeading, "propTypes", {
  link: _propTypes["default"].shape({
    url: _propTypes["default"].string,
    text: _propTypes["default"].string
  }),
  blockText: _propTypes["default"].string,
  subHeading: _propTypes["default"].string,
  sourceType: _propTypes["default"].string,
  summary: _propTypes["default"].string
});
(0, _defineProperty2["default"])(CardHeading, "defaultProps", {
  blockText: null,
  link: null,
  subHeading: null,
  sourceType: null,
  summary: null
});