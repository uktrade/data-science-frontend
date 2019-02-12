const backendService = require('../lib/backend-service')

async function renderCompanyTimeline (req, res) {
  companyTimeline = await backendService.getEventsByInternalCompanyId(req.params.company_id)
  data = companyTimeline.body

  console.log(companyTimeline)
  return res.render('company-timeline', { data })
}

module.exports = {
  renderCompanyTimeline,
}
