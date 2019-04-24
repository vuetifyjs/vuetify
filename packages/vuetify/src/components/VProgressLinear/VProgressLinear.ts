import './VProgressLinear.sass'

// Components
import {
  VFadeTransition,
  VSlideXTransition
} from '../transitions'

// Mixins
import Colorable from '../../mixins/colorable'
import { factory as PositionableFactory } from '../../mixins/positionable'
import Proxyable from '../../mixins/proxyable'

// Utilities
import { convertToUnit } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { FunctionalComponentOptions } from 'vue/types'
import { VNode } from 'vue'

const baseMixins = mixins(
  Colorable,
  PositionableFactory(['absolute', 'fixed', 'top', 'bottom']),
  Proxyable
)

interface options extends InstanceType<typeof baseMixins> {
  $refs: {
    bar: HTMLElement
  }
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-progress-linear',

  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    query: Boolean,
    reactive: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  data () {
    return {
      internalLazyValue: this.value || 0
    }
  },

  computed: {
    __cachedBackground (): VNode {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor || this.color, {
        staticClass: 'v-progress-linear__background',
        style: this.backgroundStyle
      }))
    },
    __cachedBarType (): VNode {
      return this.indeterminate ? this.__cachedIndeterminate : this.__cachedDeterminate
    },
    __cachedDeterminate (): VNode {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: `v-progress-linear__bar__determinate`,
        style: {
          width: convertToUnit(this.effectiveWidth, '%')
        }
      }))
    },
    __cachedIndeterminate (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__bar__indeterminate',
        class: {
          'v-progress-linear__bar__indeterminate--active': this.active
        }
      }, [
        this.genProgressBar('long'),
        this.genProgressBar('short')
      ])
    },
    __cachedStream (): VNode | null {
      if (!this.stream) return null

      return this.$createElement('div', {
        staticClass: 'v-progress-linear__stream',
        style: {
          width: convertToUnit(100 - this.normalizedBufer, '%')
        }
      })
    },
    backgroundStyle (): object {
      const backgroundOpacity = this.backgroundOpacity == null
        ? (this.backgroundColor ? 1 : 0.3)
        : parseFloat(this.backgroundOpacity)

      return {
        height: this.active ? convertToUnit(this.height) : 0,
        opacity: backgroundOpacity,
        width: convertToUnit(this.normalizedBufer, '%')
      }
    },
    classes (): object {
      return {
        'v-progress-linear--absolute': this.absolute,
        'v-progress-linear--fixed': this.fixed,
        'v-progress-linear--query': this.query,
        'v-progress-linear--rounded': this.rounded,
        'v-progress-linear--striped': this.striped
      }
    },
    computedTransition (): FunctionalComponentOptions {
      return this.indeterminate ? VFadeTransition : VSlideXTransition
    },
    effectiveWidth (): number {
      if (!this.normalizedBufer) return 0
      return +this.normalizedValue * 100 / +this.normalizedBufer
    },
    normalizedBufer (): number {
      if (this.bufferValue < 0) return 0
      if (this.bufferValue > 100) return 100
      return parseFloat(this.bufferValue)
    },
    normalizedValue (): number {
      if (this.internalLazyValue < 0) return 0
      if (this.internalLazyValue > 100) return 100
      return parseFloat(this.internalLazyValue)
    },
    styles (): object {
      const styles: Record<string, any> = {}

      if (!this.active) {
        styles.height = 0
      }

      if (!this.indeterminate && parseFloat(this.normalizedBufer) !== 100) {
        styles.width = convertToUnit(this.normalizedBufer, '%')
      }

      return styles
    }
  },

  methods: {
    genBar () {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__bar',
        style: this.styles,
        on: !this.reactive ? undefined : {
          click: (e: MouseEvent) => {
            const { width } = this.$refs.bar.getBoundingClientRect()

            this.internalValue = e.offsetX / width * 100
          }
        },
        ref: 'bar'
      }, [
        this.$createElement(this.computedTransition, [this.__cachedBarType])
      ])
    },
    genContent () {
      return this.$slots.default && this.$createElement('div', {
        staticClass: 'v-progress-linear__content'
      }, this.$slots.default)
    },
    genProgressBar (name: 'long' | 'short') {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-progress-linear__bar__indeterminate',
        class: {
          [name]: true
        }
      }))
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-progress-linear',
      attrs: {
        'role': 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': this.normalizedBufer,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      style: {
        bottom: this.bottom ? 0 : undefined,
        height: convertToUnit(this.height),
        top: this.top ? 0 : undefined
      },
      on: this.$listeners
    }, [
      this.__cachedStream,
      this.__cachedBackground,
      this.genBar(),
      this.genContent()
    ])
  }
})
