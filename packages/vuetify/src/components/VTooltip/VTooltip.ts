import './VTooltip.sass'

// Mixins
import Activatable from '../../mixins/activatable'
import Colorable from '../../mixins/colorable'
import Delayable from '../../mixins/delayable'
import Dependent from '../../mixins/dependent'
import Menuable from '../../mixins/menuable'
import Toggleable from '../../mixins/toggleable'

// Helpers
import { convertToUnit, keyCodes, getSlotType } from '../../util/helpers'
import { consoleError } from '../../util/console'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable, Delayable, Dependent, Menuable, Toggleable).extend({
  name: 'v-tooltip',

  props: {
    closeDelay: {
      type: [Number, String],
      default: 0,
    },
    disabled: Boolean,
    openDelay: {
      type: [Number, String],
      default: 0,
    },
    openOnHover: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: 'span',
    },
    transition: String,
  },

  data: () => ({
    calculatedMinWidth: 0,
    closeDependents: false,
  }),

  computed: {
    calculatedLeft (): string {
      const { activator, content } = this.dimensions
      const unknown = !this.bottom && !this.left && !this.top && !this.right
      const activatorLeft = this.attach !== false ? activator.offsetLeft : activator.left
      let left = 0

      if (this.top || this.bottom || unknown) {
        left = (
          activatorLeft +
          (activator.width / 2) -
          (content.width / 2)
        )
      } else if (this.left || this.right) {
        left = (
          activatorLeft +
          (this.right ? activator.width : -content.width) +
          (this.right ? 10 : -10)
        )
      }

      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft)
      if (this.nudgeRight) left += parseInt(this.nudgeRight)

      return `${this.calcXOverflow(left, this.dimensions.content.width)}px`
    },
    calculatedTop (): string {
      const { activator, content } = this.dimensions
      const activatorTop = this.attach !== false ? activator.offsetTop : activator.top
      let top = 0

      if (this.top || this.bottom) {
        top = (
          activatorTop +
          (this.bottom ? activator.height : -content.height) +
          (this.bottom ? 10 : -10)
        )
      } else if (this.left || this.right) {
        top = (
          activatorTop +
          (activator.height / 2) -
          (content.height / 2)
        )
      }

      if (this.nudgeTop) top -= parseInt(this.nudgeTop)
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom)
      if (this.attach === false) top += this.pageYOffset

      return `${this.calcYOverflow(top)}px`
    },
    classes (): object {
      return {
        'v-tooltip--top': this.top,
        'v-tooltip--right': this.right,
        'v-tooltip--bottom': this.bottom,
        'v-tooltip--left': this.left,
        'v-tooltip--attached':
          this.attach === '' ||
          this.attach === true ||
          this.attach === 'attach',
      }
    },
    computedTransition (): string {
      if (this.transition) return this.transition

      return this.isActive ? 'scale-transition' : 'fade-transition'
    },
    offsetY (): boolean {
      return this.top || this.bottom
    },
    offsetX (): boolean {
      return this.left || this.right
    },
    styles (): object {
      return {
        left: this.calculatedLeft,
        maxWidth: convertToUnit(this.maxWidth),
        minWidth: convertToUnit(this.minWidth),
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex,
      }
    },
  },

  beforeMount () {
    this.$nextTick(() => {
      this.value && this.callActivate()
    })
  },

  mounted () {
    if (getSlotType(this, 'activator', true) === 'v-slot') {
      consoleError(`v-tooltip's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, this)
    }
  },

  methods: {
    activate () {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions()
      // Start the transition
      requestAnimationFrame(this.startTransition)
    },
    deactivate () {
      this.runDelay('close')
    },
    genActivatorListeners () {
      const listeners = Activatable.options.methods.genActivatorListeners.call(this)

      listeners.focus = (e: Event) => {
        this.getActivator(e)
        this.runDelay('open')
      }
      listeners.blur = (e: Event) => {
        this.getActivator(e)
        this.runDelay('close')
      }
      listeners.keydown = (e: KeyboardEvent) => {
        if (e.keyCode === keyCodes.esc) {
          this.getActivator(e)
          this.runDelay('close')
        }
      }

      return listeners
    },
    genActivatorAttributes () {
      return {
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive),
      }
    },
    genTransition () {
      const content = this.genContent()

      if (!this.computedTransition) return content

      return this.$createElement('transition', {
        props: {
          name: this.computedTransition,
        },
      }, [content])
    },
    genContent () {
      return this.$createElement(
        'div',
        this.setBackgroundColor(this.color, {
          staticClass: 'v-tooltip__content',
          class: {
            [this.contentClass]: true,
            menuable__content__active: this.isActive,
            'v-tooltip__content--fixed': this.activatorFixed,
          },
          style: this.styles,
          attrs: this.getScopeIdAttrs(),
          directives: [{
            name: 'show',
            value: this.isContentActive,
          }],
          ref: 'content',
        }),
        this.getContentSlot()
      )
    },
  },

  render (h): VNode {
    return h(this.tag, {
      staticClass: 'v-tooltip',
      class: this.classes,
    }, [
      this.showLazyContent(() => [this.genTransition()]),
      this.genActivator(),
    ])
  },
})
