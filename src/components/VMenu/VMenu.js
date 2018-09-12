import '../../stylus/components/_menus.styl'

import Vue from 'vue'

// Mixins
import Delayable from '../../mixins/delayable'
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable.js'
import Returnable from '../../mixins/returnable'
import Toggleable from '../../mixins/toggleable'

// Component level mixins
import Activator from './mixins/menu-activator'
import Generators from './mixins/menu-generators'
import Keyable from './mixins/menu-keyable'
import Position from './mixins/menu-position'

// Directives
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'

// Helpers
import { convertToUnit } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'

/* @vue/component */
export default Vue.extend({
  name: 'v-menu',

  directives: {
    ClickOutside,
    Resize
  },

  mixins: [
    Activator,
    Dependent,
    Delayable,
    Detachable,
    Generators,
    Keyable,
    Menuable,
    Position,
    Returnable,
    Toggleable
  ],

  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: 'auto' },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'v-menu-transition'
    }
  },

  data () {
    return {
      defaultOffset: 8,
      maxHeightAutoDefault: '200px',
      startIndex: 3,
      stopIndex: 0,
      hasJustFocused: false,
      resizeTimeout: null
    }
  },

  computed: {
    calculatedLeft () {
      if (!this.auto) return this.calcLeft()

      return `${this.calcXOverflow(this.calcLeftAuto())}px`
    },
    calculatedMaxHeight () {
      return this.auto ? '200px' : convertToUnit(this.maxHeight)
    },
    calculatedMaxWidth () {
      return isNaN(this.maxWidth)
        ? this.maxWidth
        : `${this.maxWidth}px`
    },
    calculatedMinWidth () {
      if (this.minWidth) {
        return isNaN(this.minWidth)
          ? this.minWidth
          : `${this.minWidth}px`
      }

      const minWidth = (
        this.dimensions.activator.width +
        this.nudgeWidth +
        (this.auto ? 16 : 0)
      )

      const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
        ? minWidth
        : parseInt(this.calculatedMaxWidth)

      return `${Math.min(
        calculatedMaxWidth,
        minWidth
      )}px`
    },
    calculatedTop () {
      if (!this.auto || this.isAttached) return this.calcTop()

      return `${this.calcYOverflow(this.calcTopAuto())}px`
    },
    styles () {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      }
    },
    tileHeight () {
      return this.dense ? 36 : 48
    }
  },

  watch: {
    activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },
    isContentActive (val) {
      this.hasJustFocused = val
    }
  },

  methods: {
    activate () {
      // This exists primarily for v-select
      // helps determine which tiles to activate
      this.getTiles()
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions()
      // Start the transition
      requestAnimationFrame(this.startTransition)
      // Once transitioning, calculate scroll position
      setTimeout(this.calculateScroll, 50)
    },
    closeConditional () {
      return this.isActive && this.closeOnClick
    },
    onResize () {
      if (!this.isActive) return

      // Account for screen resize
      // and orientation change
      // eslint-disable-next-line no-unused-expressions
      this.$refs.content.offsetWidth
      this.updateDimensions()

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.updateDimensions, 100)
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-menu',
      class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
      directives: [{
        arg: 500,
        name: 'resize',
        value: this.onResize
      }],
      on: {
        keydown: this.onKeyDown
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.$createElement(ThemeProvider, {
        props: {
          dark: this.$vuetify.dark || this.dark
        }
      }, [this.genTransition()])
    ])
  }
})
