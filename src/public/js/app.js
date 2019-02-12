const AutoSubmit = require('./modules/auto-submit')
const CheckboxTypeahead = require('./modules/checkbox-typeahead')
const MirrorValue = require('./modules/mirror-value.js')

const marketExportedToTypeahead = new CheckboxTypeahead()
const marketOfInterestTypeahead = new CheckboxTypeahead()

AutoSubmit.init()

if (document.getElementsByClassName('js-market-of-interest').length) {
  marketOfInterestTypeahead.init('market-of-interest')
}

if (document.getElementsByClassName('js-market-exported-to').length) {
  marketExportedToTypeahead.init('market-exported-to')
}

MirrorValue.init()
