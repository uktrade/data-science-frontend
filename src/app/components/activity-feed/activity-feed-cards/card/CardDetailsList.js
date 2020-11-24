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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: 0;\n  padding-left: 0\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  list-style-type: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledListItem = (0, _styledComponents["default"])('li')(_templateObject());
var StyledUList = (0, _styledComponents["default"])('ul')(_templateObject2());

var CardDetailsList =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(CardDetailsList, _React$PureComponent);

  function CardDetailsList() {
    (0, _classCallCheck2["default"])(this, CardDetailsList);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CardDetailsList).apply(this, arguments));
  }

  (0, _createClass2["default"])(CardDetailsList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          itemRenderer = _this$props.itemRenderer,
          itemPropName = _this$props.itemPropName;
      return _react["default"].createElement(StyledUList, null, items.map(function (item, index) {
        return _react["default"].createElement(StyledListItem, {
          key: item.id
        }, itemRenderer(item, index, itemPropName));
      }));
    }
  }]);
  return CardDetailsList;
}(_react["default"].PureComponent);

exports["default"] = CardDetailsList;
(0, _defineProperty2["default"])(CardDetailsList, "propTypes", {
  items: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  itemRenderer: _propTypes["default"].any.isRequired,
  itemPropName: _propTypes["default"].string
});
(0, _defineProperty2["default"])(CardDetailsList, "defaultProps", {
  itemPropName: null
});