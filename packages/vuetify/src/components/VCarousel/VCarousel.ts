// Styles
import './VCarousel.sass'

// Extensions
import VWindow from '../VWindow/VWindow'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
// TODO: Move this into core components v2.0
import ButtonGroup from '../../mixins/button-group'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { deprecate } from '../../util/console'

// Types
import { VNode } from 'vue'
import { VNodeDirective } from 'vue/types/vnode'

export default VWindow.extend({
  name: 'v-carousel',

  props: {
    continuous: {
      type: Boolean,
      default: true
    },
    cycle: {
      type: Boolean,
      default: true
    },
    delimiterIcon: {
      type: String,
      default: '$vuetify.icons.delimiter'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideControls: Boolean,
    hideDelimiters: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: (value: string | number) => value > 0
    },
    showArrows: {
      type: Boolean,
      default: true
    },
    showArrowsOnHover: Boolean,
    mandatory: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      internalHeight: this.height,
      slideTimeout: undefined as number | undefined
    }
  },

  computed: {
    classes (): object {
      return {
        'v-carousel--show-arrows-on-hover': this.showArrowsOnHover
      }
    },
    isDark (): boolean {
      return this.dark || !this.light
    }
  },

  watch: {
    internalValue: 'restartTimeout',
    interval: 'restartTimeout',
    height (val, oldVal) {
      if (val === oldVal || !val) return
      this.internalHeight = val
    },
    cycle (val) {
      if (val) {
        this.restartTimeout()
      } else {
        clearTimeout(this.slideTimeout)
        this.slideTimeout = undefined
      }
    }
  },

  created () {
    if (this.hideControls) {
      deprecate('hide-controls', ':show-arrows="false"', this)
    }
  },

  mounted () {
    this.startTimeout()
  },

  methods: {
    genDelimiters (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-carousel__controls'
      }, [this.genItems()])
    },
    genItems (): VNode {
      const length = this.items.length
      const children = []

      for (let i = 0; i < length; i++) {
        const child = this.$createElement(VBtn, {
          staticClass: 'v-carousel__controls__item',
          props: {
            icon: true,
            small: true,
            value: this.getValue(this.items[i], i)
          }
        }, [
          this.$createElement(VIcon, {
            props: { size: 18 }
          }, this.delimiterIcon)
        ])

        children.push(child)
      }

      return this.$createElement(ButtonGroup, {
        props: {
          value: this.internalValue
        },
        on: {
          change: (val: any) => {
            this.internalValue = val
          }
        }
      }, children)
    },
    restartTimeout () {
      this.slideTimeout && clearTimeout(this.slideTimeout)
      this.slideTimeout = undefined

      const raf = requestAnimationFrame || setTimeout
      raf(this.startTimeout)
    },
    startTimeout () {
      if (!this.cycle) return

      this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000)
    }
  },

  render (h): VNode {
    const children = []
    const data = {
      staticClass: 'v-window v-carousel',
      class: this.classes,
      style: {
        height: convertToUnit(this.height)
      },
      directives: [] as VNodeDirective[]
    }

    /* istanbul ignore else */
    if (!this.touchless) {
      data.directives.push({
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      } as VNodeDirective)
    }

    if (!this.hideDelimiters) {
      children.push(this.genDelimiters())
    }

    return h('div', data, [this.genContainer(), children])
  }
})
