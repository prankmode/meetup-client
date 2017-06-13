'use strict'

const getFormFields = require('../../../lib/get-form-fields')
// view controller functions
const view = require('../view')
// upload API and ui functions
const meetupsApi = require('./api')
const meetupsUi = require('./ui')

const onGetMeetups = function (event) {
  event.preventDefault()
  console.log('events:onGetMeetups')
  meetupsApi.getMeetups()
    .then(meetupsUi.getMeetupsSuccess)
    .catch(meetupsUi.getMeetupsFailure)
}

const onSearchMeetups = function (event) {
  event.preventDefault()
  console.log('events:onSearchMeetups')
  const data = getFormFields(this)
  meetupsApi.searchMeetups(data)
    .then(meetupsUi.searchMeetupsSuccess)
    .catch(meetupsUi.searchMeetupsFailure)
}

const addHandlers = function () {
  $('.content-div').on('submit', '#m-search', onSearchMeetups)
  $('.navbar-div').on('click', '#show-mypeeks', onGetMeetups)
}

module.exports = {
  addHandlers,
  onGetMeetups
}
