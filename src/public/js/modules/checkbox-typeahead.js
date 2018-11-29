const ES6Promise = require('es6-promise')
ES6Promise.polyfill()

const axios = require('axios')

const { closest } = require('../lib/helpers')

const CheckboxTypeahead = {
  selectors: {
    box: '.govuk-checkboxes__input',
  },
  root: '.js-checkbox-typeahead',
  classes: {
    hide: 'app-js-hidden',
    checkbox: 'js-checkbox-typeahead-input',
  },
  list: [],

  applyTypeahead (boxes, valuesToShow) {
    Array.from(boxes).forEach((item) => {
      const box = item.parentNode

      box.classList.add(this.classes.hide)
      Array.from(valuesToShow).forEach((checkbox) => {
        if (checkbox.value === item.value) {
          box.classList.remove(this.classes.hide)
        }
      })
    })
  },

  bindEvents () {
    document.addEventListener('keyup', this.typeahead.bind(this))
  },

  clearTypeahead (boxes) {
    Array.from(boxes).forEach((item) => {
      const box = item.parentNode
      box.classList.remove(this.classes.hide)
    })
  },

  filterResults (query, countries) {
    return countries.filter((country) => {
      const countryName = country.text
      const regex = new RegExp(query.replace(/\s\s+/g, ' '), 'i')

      return countryName.match(regex)
    })
  },

  init (name = '') {
    this.filterName = name

    axios
      .get(`/${this.filterName}`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then(res => this.setList(res.data))

    this.bindEvents()
  },

  typeahead (event) {
    const target = event.target

    if (!target.classList.contains(this.classes.checkbox)) { return }

    const boxes = closest(target, this.root).querySelectorAll(this.selectors.box)

    if (target.value.length >= 3) {
      const valuesToShow = this.filterResults(target.value, this.list)
      this.applyTypeahead(boxes, valuesToShow)
    } else {
      this.clearTypeahead(boxes)
    }
  },

  setList (list) {
    this.list = list
  },
}

module.exports = CheckboxTypeahead
