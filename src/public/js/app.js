const AutoSubmit = require('./modules/auto-submit')
const CheckboxTypeahead = require('./modules/checkbox-typeahead')
const toggleDetails = require('./modules/toggle-details')
const MirrorValue = require('./modules/mirror-value.js')

const marketExportedToTypeahead = new CheckboxTypeahead()
const marketOfInterestTypeahead = new CheckboxTypeahead()
const sectorsTypeahead = new CheckboxTypeahead()

AutoSubmit.init()

if (document.getElementsByClassName('js-market-of-interest').length) {
  marketOfInterestTypeahead.init('market-of-interest')
}

if (document.getElementsByClassName('js-market-exported-to').length) {
  marketExportedToTypeahead.init('market-exported-to')
}

if (document.getElementsByClassName('js-dit-sectors').length) {
  sectorsTypeahead.init('dit-sectors')
}

if (document.getElementsByClassName('js-company-profile-details').length) {
  toggleDetails.init('js-company-profile-details')
}

MirrorValue.init()
