const backendService = require('../lib/backend-service')

async function renderCompanyTimeline (req, res) {
  const companyProfile = await backendService.getCompanyProfileByInternalCompanyId(req.params.company_id)

  profile = companyProfile.body.result[0]

  return res.render('company-timeline', { profile })
}

module.exports = {
  renderCompanyTimeline,
}
