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

const createMeetup = (data) => {
  console.log('api:createMeetup')
  return $.ajax({
    url: config.apiOrigin + '/meetups/' + data,
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteMeetup = (data) => {
  console.log('api:deleteMeetup')
  return $.ajax({
    url: config.apiOrigin + '/delete/' + data,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  createMeetup,
  getMeetups,
  searchMeetups
}
