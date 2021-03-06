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
  store.user = response.user
  // change the contents of the nav bar now that we are signed in
  view.setSignedInMode()
}

const signInFailure = () => {
  view.showAlert(`error`, `Error signing in - try again.`)
  // clear the form
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
  // set to signed out mode
  view.setSignedOutMode()
}

const signOutFailure = () => {
  // set alert error
  view.showAlert(`error`, `Error signing out`)
}

const updateEmailSuccess = (response) => {
  // re-store the user because it has more values filled in
  store.user.verified_reminder_email = response.user.verified_reminder_email
  store.user.reminder_email = response.user.reminder_email
  // need to make that form go away
  view.clearView('.search-div')
}

const updateEmailFailure = () => {
  // need to make that form go away
  view.showAlert(`error`, `Could not confirm email.`)
}

module.exports = {
  signUpFailure,
  signInSuccess,
  signInFailure,
  updateEmailSuccess,
  updateEmailFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
