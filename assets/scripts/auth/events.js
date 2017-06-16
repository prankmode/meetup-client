'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const authApi = require('./api')
const authUi = require('./ui')
const meetupsApi = require('../meetups/api')
const meetupsUi = require('../meetups/ui')
const view = require('../view')

const onSignUp = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()

  // validate input fields
  if (!data.credentials.email) {
    view.formAlert('#sign-up', '#sign-up-email')
  } else if (!data.credentials.password) {
    view.formAlert('#sign-up', '#sign-up-password')
  } else if (!data.credentials.password_confirmation) {
    view.formAlert('#sign-up', '#sign-up-password-confirm')
  } else if (data.credentials.password !== data.credentials.password_confirmation) {
    view.formAlert('#sign-up', '#sign-up-password-confirm')
  } else {
    // okay, we can make the call to sign them up!
    authApi.signUp(data)
      .then(authUi.signUpSuccess)
      // after sign-up, automatically sign in
      .then(() => {
        authApi.signIn(data)
          .then(authUi.signInSuccess)
          .catch(authUi.signInFailure)
      })
      .catch(authUi.signUpFailure)
  }
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()

  // validate input fields
  if (!data.credentials.email) {
    view.formAlert('#sign-in', '#sign-in-email')
  } else if (!data.credentials.password) {
    view.formAlert('#sign-in', '#sign-in-password')
  } else {
    authApi.signIn(data)
      .then(authUi.signInSuccess)
      .then(function () {
        meetupsApi.getMyMeetups()
          .then(meetupsUi.getMyMeetupsSuccess)
          .catch(meetupsUi.getMyMeetupsFailure)
      })
      .catch(authUi.signInFailure)
  }
}

const onChangePassword = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()
  // validate input fields
  if (!data.passwords.old) {
    view.formAlert('#change-password', '#change-password-old')
  } else if (!data.passwords.new) {
    view.formAlert('#change-password', '#change-password-new')
  } else if (data.passwords.new !== data.passwords.password_confirmation) {
    view.formAlert('#change-password', '#change-password-confirm')
  } else {
    // make API call and set up handlers for callbacks
    authApi.changePassword(data)
      .then(authUi.changePasswordSuccess)
      .catch(authUi.changePasswordFailure)
  }
}

const onSignOut = function (event) {
  event.preventDefault()

  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutFailure)
}

// addHandlers()
//    assign event handlers to forms, buttons, and links in the UI

const addHandlers = () => {
  $('.navbar-div').on('click', '#sign-up-btn', function () {
    view.showAuth('signup')
  })
  $('.navbar-div').on('click', '#sign-in-btn', function () {
    view.showAuth('signin')
  })

  // user sign in form submission
  $('.search-div').on('submit', '#sign-in', onSignIn)
  // new user sign up form submission
  $('.search-div').on('submit', '#sign-up', onSignUp)
  // change password form submission
  $('.navbar-div').on('submit', '#change-password', onChangePassword)
  // sign out buton click
  $('.navbar-div').on('click', '#sign-out-btn', onSignOut)

  // tabbed ui toggles
  $('.search-div').on('show.bs.tab', 'a[data-toggle="tab"]', function (event) {
    // clear fields from previous active tab
    $($(event.relatedTarget).attr('href')).find('.form-control').val('')

    // remove validation errors
    view.clearFormAlerts('#' + $($(event.relatedTarget).attr('href')).find('form').attr('id'))
    // close any errors before proceeding
    view.closeError()
  })
}

module.exports = {
  addHandlers
}
