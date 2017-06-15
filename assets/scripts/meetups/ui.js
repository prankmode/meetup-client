'use strict'

const view = require('../view.js')

const getMyMeetupsSuccess = (response) => {
  console.log('ui:getMyMeetupsSuccess')
  console.log(response)
  view.showMeetups(response.meetups, '.my-meetups-div')
}

const getMyMeetupsFailure = () => {
  console.log('ui:getMyMeetupsFailure')
  view.showAlert(`error`, `Couldn't get your list of meetups...`)
}

const searchMeetupsSuccess = (response) => {
  console.log('ui:getMeetupsSuccess')
  console.log(response)
  view.showMeetups(response.results, '.all-meetups-div')
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
  getMyMeetupsSuccess,
  getMyMeetupsFailure,
  createMeetupSuccess,
  createMeetupFailure,
  deleteMeetupSuccess,
  deleteMeetupFailure,
  searchMeetupsSuccess,
  searchMeetupsFailure
}
