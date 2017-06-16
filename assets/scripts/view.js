'use strict'
const store = require('./store')

// renderView(element, hbsFile, params)
// element - the html element that will be replaced with the
//           generated content
// hbsFile - the handlebars file to use
// params   - data for the handlebars file
//
const renderView = (element, hbsFile, params) => {
  console.log('renderView')
  console.log('hbsFile ', hbsFile)
  console.log('params', params)
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).html(content)
}

// replaceView(element, hbsFile, params)
// renders the template and replaces the element

const replaceView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).replaceWith(content)
}

// appendView(element, filepath, params)
// renders the template and appends it to the element

const appendView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).append(content)
}

// prependView(element, filepath, params)
// renders the template and appends it to the element

const prependView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).prepend(content)
}

// clearView(element)
// clears the html from the specified element

const clearView = (element) => {
  $(element).html('')
}

//
// PUBLIC AND PRIVATE MODES
//

// navbar has two "views" - if the user is signed out and
// if the user is signed in

const setSignedOutMode = () => {
  // closeAlert()
  renderView('.navbar-div', 'nav-so')
  renderView('.search-div', 'search-bar')
  clearView('.all-meetups-div')
  clearView('.my-meetups-div')
}

const setSignedInMode = () => {
  // closeAlert()
  renderView('.navbar-div', 'nav-si')
  clearView('.search-div')
  clearView('.all-meetups-div')
  // initTempView()
}

const showAuth = (inOrUp) => {
  if (inOrUp === 'signin') {
    renderView('.search-div', 'form-auth')
    $('#sign-in-tab').addClass('active')
    $('#sign-in-pane').addClass('active')
    $('#sign-up-tab').removeClass('active')
    $('#sign-up-pane').removeClass('active')
  } else {
    renderView('.search-div', 'form-auth')
    $('#sign-up-tab').addClass('active')
    $('#sign-up-pane').addClass('active')
    $('#sign-in-tab').removeClass('active')
    $('#sign-in-pane').removeClass('active')
  }
}

// formAlert(form, field)
// triggers form input validation alert

const formAlert = (form, field) => {
  clearFormAlerts(form)
  // apply alert classes to specfic input
  $(field).closest('.form-group').addClass('has-warning has-feedback')
  // add alert icon to specific input
  $(field).closest('.input-group').find('.form-control').after(`<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>`)
  // show help text for specific input
  $(field).closest('.form-group').find('.help-block').show()
}

// clearFormFields(form)
// clear all values from form fields

const clearForm = (form) => {
  // clear form field alerts
  clearFormAlerts(form)
  // clear field values
  $(form).find('.form-control').val('')
}

// clearFormAlerts(form)
// clear all feedback classes and icons from form fields

const clearFormAlerts = (form) => {
  // clear all alert classes from inputs
  $(form).find('.form-group').removeClass('has-warning has-feedback')
  // remove all alert class icons from inputs
  $(form).find('.form-group .form-control-feedback').remove()
  // hide any visible help text
  $(form).find('.help-block').hide()
}

// showAlert(mode, message)
// displays global alert box for info or warning

const showAlert = (mode, message) => {
  // convert mode label to bootstrap class
  mode = (mode === 'error') ? 'danger' : 'info'
  // if there's already an alert
  if ($('.alert').length) {
    // replace the existing alert
    replaceView('.alert', 'alert', { mode: mode, message: message })
  } else {
    // insert a new alert
    prependView('.search-div', 'alert', { mode: mode, message: message })
  }
}

// closeError()
// close global error box but not info alerts

const closeError = () => {
  $('.alert-danger').alert('close')
}

// closeAlert()
//  close all global alert boxes

const closeAlert = () => {
  $('.alert').alert('close')
}

// showChangePasswordSuccess()
// password changed successfully

const showChangePasswordSuccess = () => {
  // collapse change password dropdown
  $('#change-password-nav').dropdown('toggle')
  $('.navbar-collapse').collapse('hide')
  // clear change password form fields
  $('#change-password input').val('')
  // display successful alert message
  showAlert('info', 'Your password is changed. Hope you remember it.')
}

// showChangePasswordFailure()
// password change failed

const showChangePasswordFailure = () => {
  // collapse change password dropdown
  $('#change-password-nav').dropdown('toggle')
  $('.navbar-collapse').collapse('hide')
  // clear change password form fields
  $('#change-password input').val('')
  // display successful alert message
  showAlert(`error`, `Could not change your password.  Not for lack of trying.`)
}

const showMeetups = (meetups, div) => {
  console.log('view:showMeetups: meetups: ', meetups)

  if (div === '.my-meetups-div') {
    renderView(div, 'show-my-meetups', { data: meetups })
  } else {
    renderView(div, 'show-all-meetups', { user: store.user, data: meetups })
  }
  // if someone is signed in, don't show any popovers
  if (!store.user) {
    console.log('turning popovers on')
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }
}

const showSearchBox = () => {
  console.log('view:showSearchBox')
  renderView('.search-div', 'search-bar')
}

const addHandlers = () => {
  $('.navbar-div').on('click', '#peek-search-btn', showSearchBox)

  // DROPDOWN MENU EVENTS
  // add animation to dropdown expand
  $('.navbar-div').on('show.bs.dropdown', '.dropdown', (event) => {
    $(event.target).find('.dropdown-menu').first().stop(true, true).slideDown(250)
  })

  // add animation to dropdown collapse
  $('.navbar-div').on('hide.bs.dropdown', '.dropdown', (event) => {
    event.preventDefault()
    $(event.target).find('.dropdown-menu').first().stop(true, true).slideUp(
      250, () => {
        // close dropdown menu
        $('.dropdown').removeClass('open')
        $('.dropdown').find('.dropdown-toggle').attr('aria-expanded', 'false')
        // clear fields
        clearForm($(event.target).find('.form').val('id'))
      })
  })
}

//
// VIEW INITIALIZERS
//

// initView()
// initializes view containers and event handlers
// this is the view that comes up at index.html
// it is the signin/signup form
const initView = () => {
  // navbar reflects not signed in (user is signed out)
  renderView('.navbar-div', 'nav-so')
  // If you are not logged in, just put up a search box
  // and allow user to search for meetups.  Being a user is
  // not yet required.
  renderView('.search-div', 'search-bar')
  // add event handlers for view contoller elements
  addHandlers()
}

module.exports = {
  initView,
  setSignedOutMode,
  setSignedInMode,
  showAlert,
  formAlert,
  clearForm,
  clearFormAlerts,
  closeError,
  closeAlert,
  showChangePasswordSuccess,
  showChangePasswordFailure,
  showMeetups,
  showAuth,
  addHandlers
}
