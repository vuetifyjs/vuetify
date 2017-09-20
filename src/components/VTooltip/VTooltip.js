require('../../stylus/components/_tooltips.styl')

// Mixins
import Colorable from '../../mixins/colorable'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-tooltip',

  mixins: [Colorable, Detachable, Menuable, Toggleable],

  data: () => ({
    calculatedMinWidth: 0
  }),

  props: {
    debounce: {
      type: [Number, String],
      default: 100
    },
    fixed: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'span'
    },
    transition: String,
    zIndex: {
      default: '99'
    }
  },

  computed: {
    calculatedLeft () {
      const { activator, content } = this.dimensions
      let left = 0

      if (this.top || this.bottom) {
        left = (
          activator.left +
          (activator.width / 2) -
          (content.width / 2)
        )
      } else if (this.left || this.right) {
        left = (
          activator.left +
          (this.right ? activator.width : -content.width) +
          (this.right ? 20 : -20)
        )
      }

      return `${this.calcXOverflow(left)}px`
    },
    calculatedTop () {
      const { activator, content } = this.dimensions
      let top = 0

      if (this.top || this.bottom) {
        top = (
          activator.top -
          (this.top ? content.height : -content.height)
        )
      } else if (this.left || this.right) {
        top = (
          activator.top +
          (activator.height / 2) -
          (content.height / 2)
        )
      }

      return `${this.calcYOverflow(top + this.pageYOffset)}px`
    },
    classes () {
      return {
        'tooltip--absolute': this.absolute,
        'tooltip--fixed': this.fixed && !this.absolute,
        'tooltip--top': this.top,
        'tooltip--right': this.right,
        'tooltip--bottom': this.bottom,
        'tooltip--left': this.left
      }
    },
    computedTransition () {
      if (this.transition) return this.transition
      if (this.top) return 'slide-y-reverse-transition'
      if (this.right) return 'slide-x-transition'
      if (this.bottom) return 'slide-y-transition'
      if (this.left) return 'slide-x-reverse-transition'
    },
    offsetY () {
      this.top || this.bottom
    },
    offsetX () {
      return this.left || this.right
    },
    styles () {
      return {
        left: this.calculatedLeft,
        opacity: this.isActive ? 0.9 : 0,
        top: this.calculatedTop,
        zIndex: this.zIndex
      }
    }
  },

  methods: {
    activate () {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions()
      // Start the transition
      requestAnimationFrame(this.startTransition)
    }
  },

  render (h) {
    const tooltip = h('div', {
      staticClass: 'tooltip__content',
      'class': {
        [this.color]: this.color,
        [this.contentClass]: true
      },
      style: this.styles,
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isContentActive
      }],
      ref: 'content'
    }, this.$slots.default)

    return h(this.tag, {
      staticClass: 'tooltip',
      'class': this.classes
    }, [
      h('transition', {
        props: {
          name: this.computedTransition
        }
      }, [tooltip]),
      h('span', {
        on: {
          mouseenter: () => {
            clearTimeout(this.leaveTimeout)

            this.isActive = true
          },
          mouseleave: () => {
            clearTimeout(this.leaveTimeout)

            this.leaveTimeout = setTimeout(
              () => (this.isActive = false),
              this.debounce
            )
          }
        },
        ref: 'activator'
      }, this.$slots.activator)
    ])
  }
}
