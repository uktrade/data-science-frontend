const { startCase } = require('lodash')

const backendService = require('../lib/backend-service')
const errors = require('../middleware/errors')

async function renderCompanyTimeline (req, res) {
  try {
    const companyId = req.params.company_id
    const companyProfile = await backendService.getCompanyProfileByInternalCompanyId(companyId)
    const profile = companyProfile.body.result[0]
    const title = startCase(profile.company_name)

    return res.render('company-activity-page', { title, profile })
  } catch (error) {
    errors.handle404(req, res)
  }
}

module.exports = {
  renderCompanyTimeline,
}
