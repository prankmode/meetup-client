'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const view = require('./view')
const authEvents = require('./auth/events')
const meetingEvents = require('./meetups/events')

$(() => {
  setAPIOrigin(location, config)
  view.initView()
  authEvents.addHandlers()
  meetingEvents.addHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
