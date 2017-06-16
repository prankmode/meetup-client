'use strict'

const view = require('../view.js')

const getMyMeetupsSuccess = (response) => {
  view.showMeetups(response.meetups, '.my-meetups-div')
}

const getMyMeetupsFailure = () => {
  view.showAlert(`error`, `Couldn't get your list of meetups...`)
}

const searchMeetupsSuccess = (response) => {
  view.showMeetups(response.results, '.all-meetups-div')
}

const searchMeetupsFailure = () => {
  view.showAlert(`error`, `Hmmm. Couldn't search the meetups...`)
}

const createMeetupFailure = () => {
  view.showAlert(`error`, `Hmmm. Couldn't create the meetup...`)
}

const createMeetupSuccess = () => {
}

const deleteMeetupFailure = () => {
  view.showAlert(`error`, `Couldn't cancel that reminder.`)
}

const deleteMeetupSuccess = () => {
}

const sendEmailFailure = () => {
  view.showAlert(`error`, `Couldn't email your reminders.`)
}

const sendEmailSuccess = () => {
  view.showAlert(`info`, `Mail sent`)
}

module.exports = {
  sendEmailSuccess,
  sendEmailFailure,
  getMyMeetupsSuccess,
  getMyMeetupsFailure,
  createMeetupSuccess,
  createMeetupFailure,
  deleteMeetupSuccess,
  deleteMeetupFailure,
  searchMeetupsSuccess,
  searchMeetupsFailure
}
