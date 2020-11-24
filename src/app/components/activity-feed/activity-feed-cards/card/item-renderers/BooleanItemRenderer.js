"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var BooleanItemRenderer = function BooleanItemRenderer(item, index, property) {
  return item[property].toString();
};

BooleanItemRenderer.propTypes = {
  item: _propTypes["default"].shape.isRequired,
  index: _propTypes["default"].number.isRequired,
  property: _propTypes["default"].string.isRequired
};
var _default = BooleanItemRenderer;
exports["default"] = _default;