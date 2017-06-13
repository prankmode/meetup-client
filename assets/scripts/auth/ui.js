'use strict'

const store = require('../store')
const view = require('../view')

const signUpFailure = () => {
  // set alert error
  view.showAlert(`error`, `Could not create your account`)
  // clear sign up form
  view.clearForm('#sign-up')
}

const signInSuccess = (response) => {
  // store current user
  store.user = response.user
  // set app to private mode
  view.setSignedInMode()
}

const signInFailure = () => {
  // error message
  view.showAlert(`error`, `Error signing in - try again.`)
  // clear sign up form
  view.clearForm('#sign-in')
}

const changePasswordSuccess = () => {
  // update view state
  view.showChangePasswordSuccess()
}

const changePasswordFailure = () => {
  // update view states
  view.showChangePasswordFailure()
}

const signOutSuccess = () => {
  // clear current user
  store.user = null
  // set app to signed out mode
  view.setSignedOutMode()
}

const signOutFailure = () => {
  // set alert error
  view.showAlert(`error`, `Error signing out`)
}

module.exports = {
  // signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
