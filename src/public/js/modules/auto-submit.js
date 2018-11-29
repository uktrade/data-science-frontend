const getFormData = require('get-form-data').default
const pickBy = require('lodash/pickBy')
const XHR = require('../lib/xhr')
require('element-closest')
if (!Array.from) Array.from = require('array-from')

const AutoSubmit = {
  classes: {
    autoSubmit: 'js-auto-submit',
    preventSubmit: 'js-prevent-auto-submit',
  },

  init () {
    this.bindEvents()
  },

  handleFormSubmit (evt) {
    const targetForm = evt.target.closest('form')

    if (!targetForm ||
       evt.target.classList.contains(this.classes.preventSubmit)) { return }

    const shouldSubmit = targetForm.classList.contains(this.classes.autoSubmit)

    if (shouldSubmit) {
      evt.preventDefault()
      this.submitForm(targetForm)
    }
  },

  bindEvents () {
    document.addEventListener('change', this.handleFormSubmit.bind(this))
    document.addEventListener('submit', this.handleFormSubmit.bind(this))
  },

  toggleFreeze (input) {
    if (this.freeze) {
      if (input.type === 'checkbox') {
        input.setAttribute('disabled', true)
      } else {
        input.setAttribute('readonly', true)
      }
    } else {
      input.removeAttribute('readonly')
      input.removeAttribute('disabled')
    }
  },

  submitForm (form) {
    if (this.isSubmitting) { return }
    this.isSubmitting = true

    const query = pickBy(getFormData(form))

    Array.from(form.elements)
      .forEach(this.toggleFreeze.bind({ freeze: true }))

    XHR.request(form.action, query)
      .then(() => {
        this.isSubmitting = false
        Array.from(form.elements)
          .forEach(this.toggleFreeze.bind({ freeze: false }))
      })
  },
}

module.exports = AutoSubmit
