const backendService = require('../lib/backend-service')

async function renderCompanyTimeline (req, res) {
  const companyId = req.params.company_id
  const companyProfile = await backendService.getCompanyProfileByInternalCompanyId(companyId)
  const profile = companyProfile.body.result[0]
  const returnUrl = req.header('Referer') + '#' + companyId

  return res.render('company-activity-page', { returnUrl, profile })
}

module.exports = {
  renderCompanyTimeline,
}
