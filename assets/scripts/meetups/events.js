'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const view = require('../view')
const meetupsApi = require('./api')
const meetupsUi = require('./ui')
const store = require('../store')

const isSignedIn = function () {
  return (store.user)
}

const onGetMyMeetups = function (event) {
  event.preventDefault()
  console.log('events:onGetMeetups')
  if (!isSignedIn()) {
    view.showAlert(`error`, `You must be signed in to get your own meetups`)
  } else {
    meetupsApi.getMyMeetups()
      .then(meetupsUi.getMyMeetupsSuccess)
      .catch(meetupsUi.getMyMeetupsFailure)
  }
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
  if (isSignedIn()) {
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
    .then(() => {
      meetupsApi.getMyMeetups()
        .then(meetupsUi.getMyMeetupsSuccess)
        .catch(meetupsUi.getMyMeetupsFailure)
    })
    .catch(meetupsUi.deleteMeetupFailure)
}

const onSendReminderEmail = function (event) {
  event.preventDefault()
  console.log('event:onSendReminderEmail')
  meetupsApi.sendEmail()
    .then(meetupsUi.sendEmailSuccess)
    .catch(meetupsUi.sendEmailFailure)
}

const addHandlers = function () {
  $('.search-div').on('submit', '#m-search', onSearchMeetups)
  $('.navbar-div').on('click', '#show-mypeeks-btn', onGetMyMeetups)

  $('.all-meetups-div').on('click', '#meetup-remind-me', onRemind)
  $('.my-meetups-div').on('click', '#meetup-cancel-reminder', onCancelReminder)
  $('.my-meetups-div').on('click', '#m-search', onSendReminderEmail)
}

module.exports = {
  addHandlers,
  onGetMyMeetups
}
