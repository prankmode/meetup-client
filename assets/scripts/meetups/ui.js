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

module.exports = {
  getMeetupsSuccess,
  getMeetupsFailure,
  searchMeetupsSuccess,
  searchMeetupsFailure
}
