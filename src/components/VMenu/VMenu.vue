<script>
  import Detachable from '../../mixins/detachable'
  import Toggleable from '../../mixins/toggleable'
  import Activator from './mixins/activator'
  import Generators from './mixins/generators'
  import Position from './mixins/position'
  import Utils from './mixins/utils'
  import Keyable from './mixins/keyable'

  import ClickOutside from '../../directives/click-outside'
  import Resize from '../../directives/resize'

  export default {
    name: 'v-menu',

    mixins: [
      Activator,
      Detachable,
      Generators,
      Keyable,
      Position,
      Utils,
      Toggleable
    ],

    directives: {
      ClickOutside,
      Resize
    },

    data () {
      return {
        autoIndex: null,
        defaultOffset: 8,
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
        startIndex: 3,
        stopIndex: 0,
        tileLength: 0,
        window: {},
        absoluteX: 0,
        absoluteY: 0,
        pageYOffset: 0,
        insideContent: false,
        hasJustFocused: false,
        focusedTimeout: {}
      }
    },

    props: {
      allowOverflow: Boolean,
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
        type: [Boolean, String],
        default: 'menu-transition'
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
      minWidth: [Number, String],
      zIndex: {
        type: [Number, String],
        default: 6
      }
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
          top: `${this.calcYOverflow(this.calcTop())}px`,
          left: `${this.calcXOverflow(this.calcLeft())}px`,
          transformOrigin: this.origin,
          zIndex: this.zIndex
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
      isContentActive (val) {
        this.hasJustFocused = val
      },
      isActive (val) {
        if (this.disabled) return

        val && this.activate() || this.deactivate()
      }
    },

    methods: {
      activate () {
        if (typeof window === 'undefined') return
        this.pageYOffset = this.getOffsetTop()
        this.isBooted = true
        this.insideContent = true
        this.getTiles()
        this.updateDimensions()
        requestAnimationFrame(this.startTransition)
      },
      deactivate () {
        this.isContentActive = false
      },
      onResize () {
        if (!this.isActive) return

        this.updateDimensions()
      },
      getOffsetTop () {
        if (typeof window === 'undefined') return 0

        return window.pageYOffset ||
          document.documentElement.scrollTop
      },
      startTransition () {
        requestAnimationFrame(() => (this.isContentActive = true))
        requestAnimationFrame(this.calculateScroll)
      }
    },

    render (h) {
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
</script>

<style lang="stylus" src="../../stylus/components/_menus.styl"></style>
