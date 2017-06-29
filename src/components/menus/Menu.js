import Activator from './mixins/activator'
import Detachable from '~mixins/detachable'
import Generators from './mixins/generators'
import Position from './mixins/position'
import Utils from './mixins/utils'
import Toggleable from '~mixins/toggleable'
import Keyable from './mixins/keyable'

export default {
  name: 'menu',

  mixins: [
    Activator,
    Detachable,
    Generators,
    Keyable,
    Position,
    Utils,
    Toggleable
  ],

  data () {
    return {
      autoIndex: null,
      dimensions: {
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
        list: null,
        selected: null
      },
      direction: { vert: 'bottom', horiz: 'right' },
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px',
      resizeTimeout: {},
      startIndex: 3,
      stopIndex: 0,
      tileLength: 0,
      window: {},
      absoluteX: 0,
      absoluteY: 0,
      insideContent: false,
      hasJustFocused: false,
      focusedTimeout: {}
    }
  },

  props: {
    top: Boolean,
    left: Boolean,
    bottom: Boolean,
    right: Boolean,
    fullWidth: Boolean,
    auto: Boolean,
    offsetX: Boolean,
    offsetY: Boolean,
    disabled: Boolean,
    maxHeight: {
      default: 'auto'
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: {
      type: Boolean,
      default: false
    },
    lazy: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    activator: {
      default: null
    },
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: String,
      default: 'v-menu-transition'
    },
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    positionAbsolutely: {
      type: Boolean,
      default: false
    },
    maxWidth: [Number, String],
    minWidth: [Number, String]
  },

  computed: {
    calculatedMinWidth () {
      const minWidth = parseInt(this.minWidth) ||
        this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0)

      if (!this.maxWidth) return minWidth

      const maxWidth = parseInt(this.maxWidth)

      return maxWidth < minWidth ? maxWidth : minWidth
    },
    styles () {
      return {
        maxHeight: this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
        minWidth: `${this.calculatedMinWidth}px`,
        maxWidth: `${parseInt(this.maxWidth)}px`,
        top: `${this.calcTop()}px`,
        left: `${this.calcLeft()}px`
      }
    },
    hasActivator () {
      return !!this.$slots.activator || this.activator
    }
  },

  watch: {
    activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },
    disabled (val) {
      val && this.deactivate()
    },
    hasJustFocused (val) {
      if (!val) return

      clearTimeout(this.focusedTimeout)
      this.focusedTimeout = setTimeout(() => (this.hasJustFocused = false), 100)
    },
    isActive (val) {
      if (this.disabled) return

      val && this.activate() || this.deactivate()
    },
    windowResizeHandler () {
      this.isBooted = false
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, { passive: true })
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    activate () {
      this.insideContent = true
      this.initWindow()
      this.getTiles()
      this.updateDimensions()
      requestAnimationFrame(this.startTransition)
    },
    deactivate () {
      this.isContentActive = false
    },
    onResize () {
      clearTimeout(this.resizeTimeout)
      if (!this.isActive) return
      this.resizeTimeout = setTimeout(this.updateDimensions, 200)
    },
    startTransition () {
      this.isContentActive = true
      requestAnimationFrame(this.calculateScroll)
    }
  },

  render (h) {
    const directives = !this.openOnHover ? [{
      name: 'click-outside',
      value: () => this.closeOnClick
    }] : []

    const data = {
      'class': 'menu',
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      },
      directives,
      on: {
        keydown: e => {
          if (e.keyCode === 27) this.isActive = false
          else this.changeListIndex(e)
        }
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.genTransition()
    ])
  }
}
