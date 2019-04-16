/*
 * Toggle Details
 *
 * toggles visibility of extra details when the $root table has more than 6 rows
 */
const toggleDetails = {
  classes: {
    hidden: 'app-js-hidden',
    seeMoreCta: 'js-see-more-cta',
    noBorder: 'js-border-none',
  },
  selectors: {
    seeMore: '.js-see-more',
    toggleVisibility: '.js-toggle-visibility',
  },
  init (root = '') {
    const $root = document.getElementsByClassName(root)[0]

    if ($root.querySelectorAll('tr').length >= 7) { // 6 + table row with the cta
      /**
       * app-hidden doesn't change behaviour when no-js enabled
       */
      $root.querySelectorAll(this.selectors.seeMore)[0].classList.remove('app-hidden', 'border-bottom-none')
      this.bindEvents($root)
    } else {
      this.toggleHiddenClass($root)
    }
  },

  toggleVisibility ($root, event) {
    event.preventDefault()
    this.toggleHiddenClass($root)
    this.toggleCtaText(event.target)
    this.toggleBorderVisibility(event.target)
  },

  toggleCtaText (cta) {
    if (cta.textContent === 'See more') {
      cta.textContent = 'See less'
    } else {
      cta.textContent = 'See more'
    }
  },

  toggleHiddenClass ($root) {
    const elements = $root.querySelectorAll(this.selectors.toggleVisibility)

    Array.from(elements)
      .forEach((el) => {
        const element = el.classList
        if (element.contains(this.classes.hidden)) {
          element.remove(this.classes.hidden)
        } else {
          element.add(this.classes.hidden)
        }
      })
  },

  toggleBorderVisibility (cta) {
    const container = cta.parentNode.parentNode
    const cells = container.querySelectorAll('td')

    Array.from(cells)
      .forEach((el) => {
        const element = el.classList
        if (element.contains(this.classes.noBorder)) {
          element.remove(this.classes.noBorder)
        } else {
          element.add(this.classes.noBorder)
        }
      })
  },

  bindEvents ($root) {
    document.getElementsByClassName(this.classes.seeMoreCta)[0]
      .addEventListener('click', this.toggleVisibility.bind(this, $root))
  },
}

module.exports = toggleDetails
