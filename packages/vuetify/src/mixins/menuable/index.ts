// Mixins
import Positionable from '../positionable'
import Stackable from '../stackable'
import Activatable from '../activatable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

// Types
const baseMixins = mixins(
  Stackable,
  Positionable,
  Activatable
)

interface dimensions {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
  offsetTop: number
  scrollHeight: number
  offsetLeft: number
}

interface options extends ExtractVue<typeof baseMixins> {
  hasActivator: boolean
  attach: boolean | string | Element
  offsetY: boolean
  offsetX: boolean
  computedRelativeOffset: { top: number, left: number }
  computedLeft: number
  computedTop: number
  $refs: {
    content: HTMLElement
    activator: HTMLElement
  }

  onResize(): void

  callActivate(): void

  activate(): void

  callDeactivate(): void

  deactivate(): void

  sneakPeek(callback: Function): void

  checkActivatorFixed(): void

  checkForPageYOffset(): void

  getOffsetLeft(): number

  getOffsetTop(): number

  getInnerHeight(): number

  calcTop(): string

  calcLeft(width: number): string

  calcYOverflow(top: number): number

  calcXOverflow(left: number, width: number): number

  getRoundedBoundedClientRect(el: HTMLElement): {
    height: number
    width: number
    top: number
    left: number
    bottom: number
    right: number
  }

  measure(el: HTMLElement): dimensions

  absolutePosition(): dimensions

  updateDimensions(): void

  startTransition(): Promise<void>
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'menuable',

  props: {
    allowOverflow: Boolean,
    light: Boolean,
    dark: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto',
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: [Number, String],
      default: 0,
    },
    nudgeLeft: {
      type: [Number, String],
      default: 0,
    },
    nudgeRight: {
      type: [Number, String],
      default: 0,
    },
    nudgeTop: {
      type: [Number, String],
      default: 0,
    },
    nudgeWidth: {
      type: [Number, String],
      default: 0,
    },
    offsetOverflow: Boolean,
    openOnClick: Boolean,
    positionX: {
      type: Number,
      default: null,
    },
    positionY: {
      type: Number,
      default: null,
    },
    zIndex: {
      type: [Number, String],
      default: null,
    },
  },

  data: () => ({
    resized: 0,
    absoluteX: 0,
    absoluteY: 0,
    activatedBy: null as EventTarget | null,
    activatorFixed: false,
    dimensions: {
      activator: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
        offsetLeft: 0,
      },
      content: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
      },
    },
    hasJustFocused: false,
    hasWindow: false,
    inputActivator: false,
    isContentActive: false,
    pageWidth: 0,
    pageYOffset: 0,
    stackClass: 'v-menu__content--active',
    stackMinZIndex: 6,
  }),

  computed: {
    computedRelativeOffset () {
      if (!this.attach && this.resized !== null && this.$el) {
        const p = this.$el.closest('.v-application')
        if (p) {
          const rect = p.getBoundingClientRect()
          return { left: Math.round(rect.left), top: Math.round(rect.top) }
        }
      }
      return { left: 0, top: 0 }
    },
    computedLeft () {
      const a = this.dimensions.activator
      const c = this.dimensions.content
      const activatorLeft = (this.attach ? a.offsetLeft : a.left) || 0
      const minWidth = Math.max(a.width, c.width)
      let left = 0
      left += this.left ? activatorLeft - (minWidth - a.width) : activatorLeft
      if (this.offsetX) {
        const maxWidth = isNaN(Number(this.maxWidth))
          ? a.width
          : Math.min(a.width, Number(this.maxWidth))

        left += this.left ? -maxWidth : a.width
      }
      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft)
      if (this.nudgeRight) left += parseInt(this.nudgeRight)

      left -= this.computedRelativeOffset.left

      return left
    },
    computedTop () {
      const a = this.dimensions.activator
      const c = this.dimensions.content
      let top = 0

      if (this.top) top += a.height - c.height
      if (this.attach) top += a.offsetTop
      else top += a.top + this.pageYOffset
      if (this.offsetY) top += this.top ? -a.height : a.height
      if (this.nudgeTop) top -= parseInt(this.nudgeTop)
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom)

      top -= this.computedRelativeOffset.top

      return top
    },
    hasActivator (): boolean {
      return !!this.$slots.activator || !!this.$scopedSlots.activator || !!this.activator || !!this.inputActivator
    },
  },

  watch: {
    disabled (val) {
      val && this.callDeactivate()
    },
    isActive (val) {
      if (this.disabled) return

      val ? this.callActivate() : this.callDeactivate()
    },
    positionX: 'updateDimensions',
    positionY: 'updateDimensions',
  },

  beforeMount () {
    this.hasWindow = typeof window !== 'undefined'

    if (this.hasWindow) {
      window.addEventListener('resize', this.onResize, false)
    }
  },

  mounted () {
    this.onResize()
  },

  beforeDestroy () {
    if (this.hasWindow) {
      window.removeEventListener('resize', this.onResize, false)
    }
  },

  methods: {
    onResize () {
      this.resized++
    },
    absolutePosition () {
      return {
        offsetTop: 0,
        offsetLeft: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0,
      }
    },
    activate () {},
    calcLeft (menuWidth: number) {
      return convertToUnit(this.attach
        ? this.computedLeft
        : this.calcXOverflow(this.computedLeft, menuWidth))
    },
    calcTop () {
      return convertToUnit(this.attach
        ? this.computedTop
        : this.calcYOverflow(this.computedTop))
    },
    calcXOverflow (left: number, menuWidth: number) {
      const xOverflow = left + menuWidth - this.pageWidth + 12

      if ((!this.left || this.right) && xOverflow > 0) {
        left = Math.max(left - xOverflow, 0)
      } else {
        left = Math.max(left, 12)
      }

      return left + this.getOffsetLeft()
    },
    calcYOverflow (top: number) {
      const documentHeight = this.getInnerHeight()
      const toTop = this.pageYOffset + documentHeight
      const activator = this.dimensions.activator
      const contentHeight = this.dimensions.content.height
      const totalHeight = top + contentHeight
      const isOverflowing = toTop < totalHeight

      // If overflowing bottom and offset
      // TODO: set 'bottom' position instead of 'top'
      if (isOverflowing &&
        this.offsetOverflow &&
        // If we don't have enough room to offset
        // the overflow, don't offset
        activator.top > contentHeight
      ) {
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
      if (!this.hasWindow) return

      this.activate()
    },
    callDeactivate () {
      this.isContentActive = false

      this.deactivate()
    },
    checkForPageYOffset () {
      if (this.hasWindow) {
        this.pageYOffset = this.activatorFixed ? 0 : this.getOffsetTop()
      }
    },
    checkActivatorFixed () {
      if (this.attach) return
      let el = this.getActivator()
      while (el) {
        if (window.getComputedStyle(el).position === 'fixed') {
          this.activatorFixed = true
          return
        }
        el = el.offsetParent as HTMLElement
      }
      this.activatorFixed = false
    },
    deactivate () {},
    genActivatorListeners () {
      const listeners = Activatable.options.methods.genActivatorListeners.call(this)

      const onClick = listeners.click

      listeners.click = (e: MouseEvent & KeyboardEvent & FocusEvent) => {
        if (this.openOnClick) {
          onClick && onClick(e)
        }

        this.absoluteX = e.clientX
        this.absoluteY = e.clientY
      }

      return listeners
    },
    getInnerHeight () {
      if (!this.hasWindow) return 0

      return window.innerHeight ||
        document.documentElement.clientHeight
    },
    getOffsetLeft () {
      if (!this.hasWindow) return 0

      return window.pageXOffset ||
        document.documentElement.scrollLeft
    },
    getOffsetTop () {
      if (!this.hasWindow) return 0

      return window.pageYOffset ||
        document.documentElement.scrollTop
    },
    getRoundedBoundedClientRect (el: Element) {
      const rect = el.getBoundingClientRect()
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        bottom: Math.round(rect.bottom),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      }
    },
    measure (el: HTMLElement) {
      if (!el || !this.hasWindow) return null

      const rect = this.getRoundedBoundedClientRect(el)

      // Account for activator margin
      if (this.attach !== false) {
        const style = window.getComputedStyle(el)

        rect.left = parseInt(style.marginLeft!)
        rect.top = parseInt(style.marginTop!)
      }

      return rect
    },
    sneakPeek (cb: () => void) {
      requestAnimationFrame(() => {
        const el = this.$refs.content

        if (!el || el.style.display !== 'none') {
          cb()
          return
        }

        el.style.display = 'inline-block'
        cb()
        el.style.display = 'none'
      })
    },
    startTransition () {
      return new Promise<void>(resolve => requestAnimationFrame(() => {
        this.isContentActive = this.hasJustFocused = this.isActive
        resolve()
      }))
    },
    updateDimensions () {
      this.hasWindow = typeof window !== 'undefined'
      this.checkActivatorFixed()
      this.checkForPageYOffset()
      this.pageWidth = document.documentElement.clientWidth

      const dimensions: any = {
        activator: { ...this.dimensions.activator },
        content: { ...this.dimensions.content },
      }

      // Activator should already be shown
      if (!this.hasActivator || this.absolute) {
        dimensions.activator = this.absolutePosition()
      } else {
        const activator = this.getActivator()
        if (!activator) return

        dimensions.activator = this.measure(activator)
        dimensions.activator.offsetLeft = activator.offsetLeft
        if (this.attach !== false) {
          // account for css padding causing things to not line up
          // this is mostly for v-autocomplete, hopefully it won't break anything
          dimensions.activator.offsetTop = activator.offsetTop
        } else {
          dimensions.activator.offsetTop = 0
        }
      }

      // Display and hide to get dimensions
      this.sneakPeek(() => {
        this.$refs.content && (dimensions.content = this.measure(this.$refs.content))

        this.dimensions = dimensions
      })
    },
  },
})
