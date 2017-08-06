export default {
  methods: {
    measure (el, selector, relativeToRoot = true) {
      el = selector ? el.querySelector(selector) : el
      if (!el) return null

      const boundingRect = el.getBoundingClientRect()

      let { top, left } = boundingRect
      const { bottom, right, height, width } = boundingRect

      if (relativeToRoot) {
        const root = this.detachableRoot(el)
        if (root) {
          console.log(el, root)
          window.el = el
          window.root = root
          const rootBoundingRect = root.getBoundingClientRect()
          top -= rootBoundingRect.top
          left -= rootBoundingRect.left
          console.log('top is ' + top + ', left is ' + left)
        }
      }

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top, bottom, left, right, height, width
      }
    }
  }
}
