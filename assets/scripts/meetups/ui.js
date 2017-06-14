'use strict'

const view = require('../view.js')

const getMeetupsSuccess = (response) => {
  console.log('ui:getMeetupsSuccess')
  console.log(response)
  view.showMeetups(response.meetups)
}

const getMeetupsFailure = () => {
  console.log('ui:getMeetupsFailure')
  view.showAlert(`error`, `Hmmm. Couldn't get your list of meetups...`)
}

const searchMeetupsSuccess = (response) => {
  console.log('ui:getMeetupsSuccess')
  console.log(response)
  view.showMeetups(response.results)
}

const searchMeetupsFailure = () => {
  console.log('ui:searchMeetupsFailure')
  view.showAlert(`error`, `Hmmm. Couldn't search the meetups...`)
}

const createMeetupFailure = () => {
  console.log('ui:createMeetupsFailure')
  view.showAlert(`error`, `Hmmm. Couldn't create the meetup...`)
}

const createMeetupSuccess = () => {
  console.log('ui:searchMeetupsSuccess')
}

const deleteMeetupFailure = () => {
  console.log('ui:deleteMeetupsFailure')
  view.showAlert(`error`, `Couldn't cancel that reminder.`)
}

const deleteMeetupSuccess = () => {
  console.log('ui:deleteMeetupsSuccess')
}

module.exports = {
  getMeetupsSuccess,
  getMeetupsFailure,
  deleteMeetupSuccess,
  deleteMeetupFailure,
  searchMeetupsSuccess,
  searchMeetupsFailure
}
