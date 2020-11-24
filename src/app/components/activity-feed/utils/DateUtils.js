'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _moment = _interopRequireDefault(require('moment/moment'))

var DateUtils =
/* #__PURE__ */
(function () {
  function DateUtils () {
    (0, _classCallCheck2.default)(this, DateUtils)
  }

  (0, _createClass2.default)(DateUtils, null, [{
    key: 'format',
    value: function format (dateStr) {
      return (0, _moment.default)(dateStr).format('DD MMM YYYY')
    },
  }])
  return DateUtils
}())

exports.default = DateUtils
