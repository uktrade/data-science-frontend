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

var _constants = require("@govuk-react/constants");

var _govukColours = require("govuk-colours");

var _govukReact = require("govuk-react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants2 = require("../../constants");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  font-weight: normal;\n  color: white;\n  padding: 2px 5px;\n  background-color: ", ";\n  margin-bottom: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var BlockHeading = (0, _styledComponents["default"])(_govukReact.H3)(_templateObject(), function (_ref) {
  var sourceType = _ref.sourceType;
  return sourceType === _constants2.SOURCE_TYPES.external ? _govukColours.GREY_1 : _govukColours.BLUE;
}, _constants.SPACING.SCALE_2);

var CardBlockHeading =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CardBlockHeading, _React$PureComponent);

  function CardBlockHeading() {
    (0, _classCallCheck2["default"])(this, CardBlockHeading);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CardBlockHeading).apply(this, arguments));
  }

  (0, _createClass2["default"])(CardBlockHeading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          text = _this$props.text,
          sourceType = _this$props.sourceType;
      return _react["default"].createElement(BlockHeading, {
        sourceType: sourceType
      }, text);
    }
  }]);
  return CardBlockHeading;
}(_react["default"].PureComponent);

exports["default"] = CardBlockHeading;
(0, _defineProperty2["default"])(CardBlockHeading, "propTypes", {
  text: _propTypes["default"].string.isRequired,
  sourceType: _propTypes["default"].string
});
(0, _defineProperty2["default"])(CardBlockHeading, "defaultProps", {
  sourceType: null
});