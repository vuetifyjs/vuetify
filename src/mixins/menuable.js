import Positionable from './positionable'

import Stackable from './stackable'
import Themeable from './themeable'

const dimensions = {
  activator: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  content: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  hasWindow: false
}

/**
 * Menuable
 *
 * @mixin
 *
 * Used for fixed or absolutely positioning
 * elements within the DOM
 * Can calculate X and Y axis overflows
 * As well as be manually positioned
 */
export default {
  mixins: [
    Positionable,
    Stackable,
    Themeable
  ],

  data: () => ({
    absoluteX: 0,
    absoluteY: 0,
    dimensions: Object.assign({}, dimensions),
    isContentActive: false,
    pageYOffset: 0,
    stackClass: 'menuable__content__active',
    stackMinZIndex: 6
  }),

  props: {
    activator: {
      default: null,
      validator: val => {
        return ['string', 'object'].includes(typeof val)
      }
    },
    allowOverflow: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: [Number, String],
      default: 0
    },
    nudgeRight: {
      type: [Number, String],
      default: 0
    },
    nudgeTop: {
      type: [Number, String],
      default: 0
    },
    nudgeWidth: {
      type: [Number, String],
      default: 0
    },
    offsetOverflow: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },

  computed: {
    computedLeft () {
      const a = this.dimensions.activator
      const c = this.dimensions.content
      const minWidth = a.width < c.width ? c.width : a.width
      let left = 0

      left += this.left ? a.left - (minWidth - a.width) : a.left

      if (this.offsetX) left += this.left ? -a.width : a.width
      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft)
      if (this.nudgeRight) left += parseInt(this.nudgeRight)

      return left
    },
    computedTop () {
      const a = this.dimensions.activator
      const c = this.dimensions.content
      let top = this.top ? a.bottom - c.height : a.top

      if (!this.isAttached) top += this.pageYOffset
      if (this.offsetY) top += this.top ? -a.height : a.height
      if (this.nudgeTop) top -= this.nudgeTop
      if (this.nudgeBottom) top += this.nudgeBottom

      return top
    },
    hasActivator () {
      return !!this.$slots.activator || this.activator
    },
    isAttached () {
      return this.attach !== false
    }
  },

  watch: {
    disabled (val) {
      val && this.callDeactivate()
    },
    isActive (val) {
      if (this.disabled) return

      val && this.callActivate() || this.callDeactivate()
    }
  },

  beforeMount () {
    this.checkForWindow()
  },

  methods: {
    absolutePosition () {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      }
    },
    activate () {},
    calcLeft () {
      return `${this.isAttached
        ? this.computedLeft
        : this.calcXOverflow(this.computedLeft)
      }px`
    },
    calcTop () {
      return `${this.isAttached
        ? this.computedTop
        : this.calcYOverflow(this.computedTop)
      }px`
    },
    calcXOverflow (left) {
      const parsedMaxWidth = isNaN(parseInt(this.maxWidth))
        ? 0
        : parseInt(this.maxWidth)
      const innerWidth = this.getInnerWidth()
      const maxWidth = Math.max(
        this.dimensions.content.width,
        parsedMaxWidth
      )
      const totalWidth = left + maxWidth
      const availableWidth = totalWidth - innerWidth

      if ((!this.left || this.right) && availableWidth > 0) {
        left = (
          innerWidth -
          maxWidth -
          (innerWidth > 600 ? 30 : 12) // Account for scrollbar
        )
      }

      if (left < 0) left = 12

      return left
    },
    calcYOverflow (top) {
      const documentHeight = this.getInnerHeight()
      const toTop = this.pageYOffset + documentHeight
      const activator = this.dimensions.activator
      const contentHeight = this.dimensions.content.height
      const totalHeight = top + contentHeight
      const isOverflowing = toTop < totalHeight

      // If overflowing bottom and offset
      if (isOverflowing && this.offsetOverflow) {
        top = this.pageYOffset + (activator.top - contentHeight)
      // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12
      // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + 12
      }

      return top < 12 ? 12 : top
    },
    callActivate () {
      this.checkForWindow()
      if (!this.hasWindow) return

      this.activate()
    },
    callDeactivate () {
      this.isContentActive = false

      this.deactivate()
    },
    checkForWindow () {
      if (!this.hasWindow) {
        this.hasWindow = typeof window !== 'undefined'
      }

      if (this.hasWindow) {
        this.pageYOffset = this.getOffsetTop()
      }
    },
    deactivate () {},
    getActivator () {
      if (this.activator) {
        return typeof this.activator === 'string'
          ? document.querySelector(this.activator)
          : this.activator
      }

      return this.$refs.activator.children.length > 0
        ? this.$refs.activator.children[0]
        : this.$refs.activator
    },
    getInnerHeight () {
      if (!this.hasWindow) return 0

      return window.innerHeight ||
        document.documentElement.clientHeight
    },
    getInnerWidth () {
      if (!this.hasWindow) return 0

      return window.innerWidth
    },
    getOffsetTop () {
      if (!this.hasWindow) return 0

      return window.pageYOffset ||
        document.documentElement.scrollTop
    },
    measure (el, selector) {
      el = selector ? el.querySelector(selector) : el

      if (!el || !this.hasWindow) return null

      const rect = el.getBoundingClientRect()
      let top = rect.top
      let left = rect.left

      // Account for activator margin
      if (this.isAttached) {
        const style = window.getComputedStyle(el)

        left = parseInt(style.marginLeft)
        top = parseInt(style.marginTop)
      }

      return {
        bottom: rect.bottom,
        right: rect.right,
        top, left, width: rect.width, height: rect.height
      }
    },
    sneakPeek (cb) {
      requestAnimationFrame(() => {
        const el = this.$refs.content

        if (!el || this.isShown(el)) return cb()

        el.style.display = 'inline-block'
        cb()
        el.style.display = 'none'
      })
    },
    startTransition () {
      requestAnimationFrame(() => (this.isContentActive = true))
    },
    isShown (el) {
      return el.style.display !== 'none'
    },
    updateDimensions () {
      const dimensions = {}

      // Activator should already be shown
      dimensions.activator = !this.hasActivator
        ? this.absolutePosition()
        : this.measure(this.getActivator())

      // Display and hide to get dimensions
      this.sneakPeek(() => {
        dimensions.content = this.measure(this.$refs.content)

        this.dimensions = dimensions
      })
    }
  }
}
