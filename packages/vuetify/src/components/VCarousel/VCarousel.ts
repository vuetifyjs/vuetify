// Styles
import './VCarousel.sass'

// Extensions
import VWindow from '../VWindow/VWindow'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VProgressLinear from '../VProgressLinear'

// Mixins
// TODO: Move this into core components v2.0
import ButtonGroup from '../../mixins/button-group'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { breaking } from '../../util/console'

// Types
import { VNode, PropType } from 'vue'

export default VWindow.extend({
  name: 'v-carousel',

  props: {
    continuous: {
      type: Boolean,
      default: true,
    },
    cycle: Boolean,
    delimiterIcon: {
      type: String,
      default: '$delimiter',
    },
    height: {
      type: [Number, String],
      default: 500,
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: (value: string | number) => value > 0,
    },
    mandatory: {
      type: Boolean,
      default: true,
    },
    progress: Boolean,
    progressColor: String,
    showArrows: {
      type: Boolean,
      default: true,
    },
    verticalDelimiters: {
      type: String as PropType<'' | 'left' | 'right'>,
      default: undefined,
    },
  },

  // pass down the parent's theme
  provide (): object {
    return {
      parentTheme: this.theme,
    }
  },

  data () {
    return {
      internalHeight: this.height,
      slideTimeout: undefined as number | undefined,
    }
  },

  computed: {
    classes (): object {
      return {
        ...VWindow.options.computed.classes.call(this),
        'v-carousel': true,
        'v-carousel--hide-delimiter-background': this.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': this.isVertical,
      }
    },
    isDark (): boolean {
      return this.dark || !this.light
    },
    isVertical (): boolean {
      return this.verticalDelimiters != null
    },
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
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('hide-controls')) {
      breaking('hide-controls', ':show-arrows="false"', this)
    }
  },

  mounted () {
    this.startTimeout()
  },

  methods: {
    genControlIcons () {
      if (this.isVertical) return null

      return VWindow.options.methods.genControlIcons.call(this)
    },
    genDelimiters (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-carousel__controls',
        style: {
          left: this.verticalDelimiters === 'left' && this.isVertical ? 0 : 'auto',
          right: this.verticalDelimiters === 'right' ? 0 : 'auto',
        },
      }, [this.genItems()])
    },
    genItems (): VNode {
      const length = this.items.length
      const children = []

      for (let i = 0; i < length; i++) {
        const child = this.$createElement(VBtn, {
          staticClass: 'v-carousel__controls__item',
          attrs: {
            'aria-label': this.$vuetify.lang.t('$vuetify.carousel.ariaLabel.delimiter', i + 1, length),
          },
          props: {
            icon: true,
            small: true,
            value: this.getValue(this.items[i], i),
          },
          key: i,
        }, [
          this.$createElement(VIcon, {
            props: { size: 18 },
          }, this.delimiterIcon),
        ])

        children.push(child)
      }

      return this.$createElement(ButtonGroup, {
        props: {
          value: this.internalValue,
          mandatory: this.mandatory,
        },
        on: {
          change: (val: unknown) => {
            this.internalValue = val
          },
        },
      }, children)
    },
    genProgress () {
      return this.$createElement(VProgressLinear, {
        staticClass: 'v-carousel__progress',
        props: {
          color: this.progressColor,
          value: (this.internalIndex + 1) / this.items.length * 100,
        },
      })
    },
    restartTimeout () {
      this.slideTimeout && clearTimeout(this.slideTimeout)
      this.slideTimeout = undefined

      window.requestAnimationFrame(this.startTimeout)
    },
    startTimeout () {
      if (!this.cycle) return

      this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000)
    },
  },

  render (h): VNode {
    const render = VWindow.options.render.call(this, h)

    render.data!.style = `height: ${convertToUnit(this.height)};`

    /* istanbul ignore else */
    if (!this.hideDelimiters) {
      render.children!.push(this.genDelimiters())
    }

    /* istanbul ignore else */
    if (this.progress || this.progressColor) {
      render.children!.push(this.genProgress())
    }

    return render
  },
})
