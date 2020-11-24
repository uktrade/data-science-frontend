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

var _propTypes = _interopRequireDefault(require("prop-types"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-flow: row wrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CardHeaderContainer = (0, _styledComponents["default"])('div')(_templateObject());

var CardContent =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CardContent, _React$PureComponent);

  function CardContent() {
    (0, _classCallCheck2["default"])(this, CardContent);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CardContent).apply(this, arguments));
  }

  (0, _createClass2["default"])(CardContent, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react["default"].createElement(CardHeaderContainer, null, children);
    }
  }]);
  return CardContent;
}(_react["default"].PureComponent);

exports["default"] = CardContent;
(0, _defineProperty2["default"])(CardContent, "propTypes", {
  children: _propTypes["default"].node.isRequired
});