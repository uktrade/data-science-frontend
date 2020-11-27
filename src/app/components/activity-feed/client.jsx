/* eslint-disable no-unused-vars */

const React = require('react')
const { render } = require('react-dom')
const { ActivityFeedApp } = require('./ActivityFeedApp')

const element = document.querySelector('#activity-feed-app')

if (element) {
  const params = JSON.parse(element.dataset.params)

  render(
    <ActivityFeedApp {...params} />,
    element,
  )
}
