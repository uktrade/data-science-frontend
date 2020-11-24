'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var NumberUtils =
/* #__PURE__ */
(function () {
  function NumberUtils () {
    (0, _classCallCheck2.default)(this, NumberUtils)
  }

  (0, _createClass2.default)(NumberUtils, null, [{
    key: 'decimal',
    value: function decimal (number) {
      if (!number) {
        return null
      }

      var formatter = new Intl.NumberFormat('en-GB', {
        style: 'decimal',
      })
      return formatter.format(number)
    },
  }, {
    key: 'currency',
    value: function currency (number) {
      if (!number) {
        return null
      }

      var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumSignificantDigits: 21,
      })
      return formatter.format(number)
    },
  }])
  return NumberUtils
}())

exports.default = NumberUtils
