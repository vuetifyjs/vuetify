export default {
  methods: {
    measure (el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el

      if (!el) return null

      const { top, bottom, left, right, height, width } = el.getBoundingClientRect()
      const parentRect = this.$el.parentNode.getBoundingClientRect()

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top: this.relative && top - parentRect.top || top,
        bottom: this.relative && bottom - parentRect.bottom || bottom,
        left: this.relative && left - parentRect.left || left,
        right: this.relative && right - parentRect.right || right,
        height,
        width
      }
    }
  }
}
