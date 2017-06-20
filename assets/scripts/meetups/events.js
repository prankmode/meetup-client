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
  const data = getFormFields(this)
  // make sure it's a zip code for now
  if (/^([0-9]{5})$/.test(data.m_search.location)) {
    view.clearView('.info-div')
    meetupsApi.searchMeetups(data)
      .then(meetupsUi.searchMeetupsSuccess)
      .catch(meetupsUi.searchMeetupsFailure)
  } else {
    view.showAlert(`error`, `That is not a zip code`)
  }
}

const onRemind = function (event) {
  event.preventDefault()
  if (isSignedIn()) {
    const meetupId = $(this).attr('meetup-id')
    meetupsApi.createMeetup(meetupId)
      .then(meetupsUi.createMeetupSuccess)
      .catch(meetupsUi.createMeetupFailure)
  }
}

const onCancelReminder = function (event) {
  event.preventDefault()
  const meetupId = $(this).attr('meetup-id')
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
  //  make sure we have a good email to send to
  if (!store.user.verified_reminder_email) {
    view.confirmEmail()
  } else {
    meetupsApi.sendEmail()
      .then(meetupsUi.sendEmailSuccess)
      .catch(meetupsUi.sendEmailFailure)
  }
}

const addHandlers = function () {
  $('.search-div').on('submit', '#m-search', onSearchMeetups)
  $('.navbar-div').on('click', '#show-mypeeks-btn', onGetMyMeetups)

  $('.all-meetups-div').on('click', '#meetup-remind-me', onRemind)
  $('.my-meetups-div').on('click', '#meetup-cancel-reminder', onCancelReminder)
  $('.my-meetups-div').on('click', '#send-email-btn', onSendReminderEmail)
}

module.exports = {
  addHandlers,
  onGetMyMeetups
}
