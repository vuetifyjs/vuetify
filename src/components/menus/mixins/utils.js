export default {
  methods: {
    measure (el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el
      el = el && getParent ? el.parentElement : el

      if (!el) return null
      if (!el.nodeName && el.hasOwnProperty('clientX') && el.hasOwnProperty('clientY')) {
        return {
          top: el.clientY, bottom: el.clientY, left: el.clientX, right: el.clientX,
          width: 0, height: 0, offsetTop: 0
        }
      }

      const { top, left, bottom, right, width, height } = el.getBoundingClientRect()
      return { top, left, bottom, right, width, height, offsetTop: el.offsetTop }
    },

    sneakPeek (el, cb) {
      const oldOpacity = el.style.opacity
      const oldDisplay = el.style.display

      el.style.opacity = 0
      el.style.display = 'inline-block'
      cb()
      el.style.opacity = oldOpacity
      el.style.display = oldDisplay
    }
  }
}
