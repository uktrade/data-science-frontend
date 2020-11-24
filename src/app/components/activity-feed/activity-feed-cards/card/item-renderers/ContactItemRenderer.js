"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _govukReact = require("govuk-react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var ContactItemRenderer = function ContactItemRenderer(item) {
  var name = _react["default"].createElement(_govukReact.Link, {
    href: item.url
  }, item.name);

  var jobTitle = item.jobTitle ? _react["default"].createElement("span", null, "(", item.jobTitle, ")") : null;
  return _react["default"].createElement(_react["default"].Fragment, null, name, " ", jobTitle);
};

ContactItemRenderer.propTypes = {
  contact: _propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    url: _propTypes["default"].string,
    // Can't set this as 'isRequired'
    jobTitle: _propTypes["default"].string
  }).isRequired
};
var _default = ContactItemRenderer;
exports["default"] = _default;