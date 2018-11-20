const AutoSubmit = require('./modules/auto-submit')
const CheckboxTypeahead = require('./modules/checkbox-typeahead')
const MirrorValue = require('./modules/mirror-value.js')

AutoSubmit.init()
CheckboxTypeahead.init('market-exported-to')
CheckboxTypeahead.init('market-of-interest')
MirrorValue.init()
