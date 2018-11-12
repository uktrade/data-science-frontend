const getFormData = require('get-form-data').default
const pickBy = require('lodash/pickBy')
const XHR = require('../lib/xhr')

const AutoSubmit = {
  selector: '.js-AutoSubmit',
  isSubmitting: false,

  init () {
    this.bindEvents()
  },

  handleFormSubmit (evt) {
    const targetForm = evt.target.closest('form')

    if (!targetForm) { return }

    const shouldSubmit = targetForm.classList.contains(this.selector.substring(1))

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