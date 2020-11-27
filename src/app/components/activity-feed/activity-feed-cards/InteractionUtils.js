'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _lodash = require('lodash')

var _govukColours = require('govuk-colours')

var STATUS = {
  DRAFT: 'draft',
  COMPLETE: 'complete',
  UPCOMING: 'upcoming',
  INCOMPLETE: 'incomplete',
  CANCELLED: 'cancelled',
}
var BADGES = {
  COMPLETE: {
    text: 'Interaction',
    borderColour: _govukColours.GREEN,
  },
  UPCOMING: {
    text: 'Upcoming interaction',
    borderColour: _govukColours.BLUE,
  },
  INCOMPLETE: {
    text: 'Incomplete interaction',
    borderColour: _govukColours.BLUE,
  },
  CANCELLED: {
    text: 'Cancelled interaction',
    borderColour: _govukColours.RED,
  },
  SERVICE_DELIVERY: {
    text: 'Service delivery',
    borderColour: _govukColours.GREEN,
  },
}

var getStatus = function getStatus (activity) {
  var apiStatus = (0, _lodash.get)(activity, 'object.dit:status')

  if (apiStatus === STATUS.DRAFT) {
    var isArchived = (0, _lodash.get)(activity, 'object.dit:archived')

    if (isArchived) {
      return STATUS.CANCELLED
    }

    var startTime = (0, _lodash.get)(activity, 'object.startTime')
    var isUpcoming = new Date(startTime) > new Date()
    return isUpcoming ? STATUS.UPCOMING : STATUS.INCOMPLETE
  }

  return STATUS.COMPLETE
}

var isServiceDelivery = function isServiceDelivery (activity) {
  var activityTypes = (0, _lodash.get)(activity, 'object.type')
  return (0, _lodash.includes)(activityTypes, 'dit:ServiceDelivery')
}

var CardUtils =
/* #__PURE__ */
(function () {
  function CardUtils () {
    (0, _classCallCheck2.default)(this, CardUtils)
  }

  (0, _createClass2.default)(CardUtils, null, [{
    key: 'transform',
    value: function transform (activity) {
      var status = getStatus(activity)
      var badge = isServiceDelivery(activity) ? BADGES.SERVICE_DELIVERY : BADGES[status.toUpperCase()]
      var isUpcoming = status === STATUS.UPCOMING
      var typeText = isServiceDelivery(activity) ? 'service delivery' : 'interaction'
      return {
        badge: badge,
        isUpcoming: isUpcoming,
        typeText: typeText,
      }
    },
  }])
  return CardUtils
}())

exports.default = CardUtils
