'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const view = require('../view')
const meetupsApi = require('./api')
const meetupsUi = require('./ui')
const authUi = require('../auth/ui')

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

const onRemind = function (event) {
  event.preventDefault()
  console.log('events:onRemind')
  if (!authUi.isSignedIn()) {
    view.showAlert(`error`, `You must be signed in to add reminders`)
  } else {
    const meetupId = $(this).closest('tr').attr('meetup-id')
    console.log('meetupId ', meetupId)
    meetupsApi.createMeetup(meetupId)
      .then(meetupsUi.createMeetupSuccess)
      .catch(meetupsUi.createMeetupFailure)
  }
}

const onCancelReminder = function (event) {
  event.preventDefault()
  console.log('events:onCancelReminder')

  const meetupId = $(this).closest('tr').attr('meetup-id')
  console.log('meetupId ', meetupId)
  meetupsApi.deleteMeetup(meetupId)
    .then(meetupsUi.deleteMeetupSuccess)
    .catch(meetupsUi.deleteMeetupFailure)

}

const addHandlers = function () {
  $('.search-div').on('submit', '#m-search', onSearchMeetups)
  $('.navbar-div').on('click', '#show-mypeeks', onGetMeetups)

  $('.meetups-div').on('click', '#meetup-remind-me', onRemind)
  $('.meetups-div').on('click', '#meetup-cancel-reminder', onCancelReminder)
}

module.exports = {
  addHandlers,
  onGetMeetups
}
