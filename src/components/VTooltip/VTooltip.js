require('../../stylus/components/_tooltips.styl')

// Mixins
import Colorable from '../../mixins/colorable'
import Delayable from '../../mixins/delayable'
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-tooltip',

  mixins: [Colorable, Delayable, Dependent, Detachable, Menuable, Toggleable],

  data: () => ({
    calculatedMinWidth: 0,
    closeDependents: false
  }),

  props: {
    debounce: {
      type: [Number, String],
      default: 0
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
      default: null
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
          (this.right ? 10 : -10)
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
          (this.top ? activator.height : -activator.height) -
          (this.top ? 0 : -10)
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
      return this.top || this.bottom
    },
    offsetX () {
      return this.left || this.right
    },
    styles () {
      return {
        left: this.calculatedLeft,
        maxWidth: isNaN(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`,
        opacity: this.isActive ? 0.9 : 0,
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex
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
      'class': this.addBackgroundColorClassChecks({
        [this.contentClass]: true,
        'menuable__content__active': this.isActive
      }),
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
            this.runDelay('open', () => (this.isActive = true))
          },
          mouseleave: () => {
            this.runDelay('close', () => (this.isActive = false))
          }
        },
        ref: 'activator'
      }, this.$slots.activator)
    ])
  }
}
