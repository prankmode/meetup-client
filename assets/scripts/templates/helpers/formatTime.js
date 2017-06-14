'use strict'
const moment = require('moment')

const formatTime = (date, format) => {
  const di = parseInt(date)
  const time = moment(di)
  return time.format(format)
}

module.exports = formatTime
