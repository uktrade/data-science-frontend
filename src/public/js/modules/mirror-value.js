/*
 * Mirror Value
 *
 * Listens for a change on one form element and mirrors the value to another
 */
const MirrorValue = {
  init () {
    this.bindEvents()
  },

  handleMirrorValueChange (event) {
    if (!event.target.classList.contains('js-mirror-value')) { return }
    const sourceField = document.querySelector('.js-mirror-value')

    if (sourceField) {
      const targetSelector = sourceField.getAttribute('data-target-selector')
      const targetField = document.querySelector(targetSelector)
      targetField.value = event.target.value
    }

    document.querySelector('.app-form-filters').submit()
  },

  bindEvents () {
    document.addEventListener('change', this.handleMirrorValueChange.bind(this))
  },
}

module.exports = MirrorValue
