'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

var _lodash = require('lodash')

/* eslint-disable react/prop-types */
var mapPeople = function mapPeople (activity, personType, mapper) {
  var attributedTo = activity.object.attributedTo
  return (0, _lodash.map)((0, _lodash.filter)(attributedTo, function (_ref) {
    var type = _ref.type
    return (0, _lodash.includes)(type, personType)
  }), mapper)
}

var _getContacts = function getContacts (activity) {
  return mapPeople(activity, 'dit:Contact', function (_ref2) {
    var id = _ref2.id
    var url = _ref2.url
    var name = _ref2.name
    var jobTitle = _ref2['dit:jobTitle']
    return (0, _lodash.pickBy)({
      id: id,
      url: url,
      name: name,
      jobTitle: jobTitle,
      // Optional field,
      type: 'Contact',
    })
  })
}

var _getAdvisers = function getAdvisers (activity) {
  return mapPeople(activity, 'dit:Adviser', function (_ref3) {
    var id = _ref3.id
    var name = _ref3.name
    var emailAddress = _ref3['dit:emailAddress']
    var team = _ref3['dit:team']
    return (0, _lodash.pickBy)({
      id: id,
      name: name,
      emailAddress: emailAddress,
      team: (0, _lodash.get)(team, 'name'),
      // Only available for Interactions
      type: 'Adviser',
    })
  })
}

var CardUtils =
/* #__PURE__ */
(function () {
  function CardUtils () {
    (0, _classCallCheck2.default)(this, CardUtils)
  }

  (0, _createClass2.default)(CardUtils, null, [{
    key: 'canRenderByTypes',
    value: function canRenderByTypes (activity, types) {
      var activityTypes = (0, _lodash.get)(activity, 'object.type')
      return (0, _lodash.some)(types, function (type) {
        return (0, _lodash.includes)(activityTypes, type)
      })
    },
  }, {
    key: 'transform',
    value: function transform (activity) {
      return {
        url: (0, _lodash.get)(activity, 'object.url'),
        subject: (0, _lodash.get)(activity, 'object.dit:subject'),
        service: (0, _lodash.get)(activity, 'object.dit:service.name'),
        startTime: (0, _lodash.get)(activity, 'object.startTime'),
      }
    },
  }, {
    key: 'getAdvisers',
    value: function getAdvisers (activity) {
      return _getAdvisers(activity)
    },
  }, {
    key: 'getContacts',
    value: function getContacts (activity) {
      return _getContacts(activity)
    },
  }])
  return CardUtils
}())

exports.default = CardUtils;
(0, _defineProperty2.default)(CardUtils, 'getAdviser', function (activity) {
  var adviser = {
    id: (0, _lodash.get)(activity, 'actor.id'),
    name: (0, _lodash.get)(activity, 'actor.name'),
    emailAddress: (0, _lodash.get)(activity, 'actor.dit:emailAddress'),
  }
  return adviser.name && adviser.emailAddress ? adviser : null
})
