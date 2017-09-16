<script>
  // Mixins
  import Bootable from '../../mixins/bootable'
  import Detachable from '../../mixins/detachable'
  import Menuable from '../../mixins/menuable.js'
  import Toggleable from '../../mixins/toggleable'

  // Component level mixins
  import Activator from './mixins/menu-activator'
  import Generators from './mixins/menu-generators'
  import Keyable from './mixins/menu-keyable'
  import Position from './mixins/menu-position'

  // Directives
  import ClickOutside from '../../directives/click-outside'
  import Resize from '../../directives/resize'

  export default {
    name: 'v-menu',

    mixins: [
      Activator,
      Bootable,
      Detachable,
      Generators,
      Keyable,
      Menuable,
      Position,
      Toggleable
    ],

    directives: {
      ClickOutside,
      Resize
    },

    data () {
      return {
        defaultOffset: 8,
        maxHeightAutoDefault: '200px',
        startIndex: 3,
        stopIndex: 0,
        hasJustFocused: false,
        focusedTimeout: {}
      }
    },

    props: {
      allowOverflow: Boolean,
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
      maxWidth: { default: 'auto' },
      minWidth: [Number, String],
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
      nudgeTop: {
        type: Number,
        default: 0
      },
      nudgeWidth: {
        type: Number,
        default: 0
      },
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
        default: 'menu-transition'
      }
    },

    computed: {
      calculatedLeft () {
        let left = this.calcLeft
        if (this.auto) left = this.calcLeftAuto

        return `${this.calcXOverflow(left())}px`
      },
      calculatedMaxHeight () {
        return this.auto
          ? '200px'
          : isNaN(this.maxHeight)
          ? this.maxHeight
          : `${this.maxHeight}px`
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

        return `${(
          this.dimensions.activator.width +
          this.nudgeWidth +
          (this.auto ? 16 : 0)
        )}px`
      },
      calculatedTop () {
        let top = this.calcTop
        if (this.auto) top = this.calcTopAuto

        return `${this.calcYOverflow(top())}px`
      },
      styles () {
        return {
          maxHeight: this.calculatedMaxHeight,
          minWidth: this.calculatedMinWidth,
          maxWidth: this.calculatedMaxWidth,
          top: this.calculatedTop,
          left: this.calculatedLeft,
          transformOrigin: this.origin,
          zIndex: this.zIndex
        }
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
        this.startTransition()
        // Once transitioning, calculate scroll position
        requestAnimationFrame(this.calculateScroll)
      },
      onResize () {
        if (!this.isActive) return

        // Account for screen resize
        // and orientation change
        this.updateDimensions()
      }
    },

    render (h) {
      // Do not add click outside for hover menu
      const directives = !this.openOnHover ? [{
        name: 'click-outside',
        value: () => this.closeOnClick
      }] : []

      directives.push({
        name: 'resize',
        value: {
          debounce: 500,
          value: this.onResize
        }
      })

      const data = {
        staticClass: 'menu',
        class: {
          'menu--disabled': this.disabled
        },
        style: {
          display: this.fullWidth ? 'block' : 'inline-block'
        },
        directives,
        on: {
          keydown: this.changeListIndex
        }
      }

      return h('div', data, [
        this.genActivator(),
        this.genTransition()
      ])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_menus.styl"></style>
