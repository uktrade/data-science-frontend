const AutoSubmit = require('./modules/auto-submit')
const CheckboxTypeahead = require('./modules/checkbox-typeahead')
const MirrorValue = require('./modules/mirror-value.js')

const marketExportedToTypeahead = new CheckboxTypeahead()
const marketOfInterestTypeahead = new CheckboxTypeahead()

AutoSubmit.init()
marketExportedToTypeahead.init('market-exported-to')
marketOfInterestTypeahead.init('market-of-interest')
MirrorValue.init()
