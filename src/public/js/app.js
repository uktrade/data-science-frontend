const AutoSubmit = require('./modules/auto-submit')
const CheckboxTypeahead = require('./modules/checkbox-typeahead')

AutoSubmit.init()
CheckboxTypeahead.init('market-exported-to')
CheckboxTypeahead.init('market-of-interest')
