'use strict'

const store = require('../store')
const config = require('../config')

const getMeetups = () => {
  console.log('api:getMeetups')
  return $.ajax({
    url: config.apiOrigin + '/meetups',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const searchMeetups = (data) => {
  console.log('api:searchMeetups')
  return $.ajax({
    url: config.apiOrigin + '/search',
    method: 'GET',
    data: data
  })
}

module.exports = {
  getMeetups,
  searchMeetups
}
