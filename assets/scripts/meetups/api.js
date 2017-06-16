'use strict'

const store = require('../store')
const config = require('../config')

const getMyMeetups = () => {
  console.log('api:getMyMeetups')
  const rv = $.ajax({
    url: config.apiOrigin + '/meetups',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
  return rv
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
    url: config.apiOrigin + '/meetups/' + data,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

const sendEmail = (data) => {
  console.log('api:sendReminderEmail')
  return $.ajax({
    url: config.apiOrigin + '/remind',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  sendEmail,
  createMeetup,
  deleteMeetup,
  getMyMeetups,
  searchMeetups
}
