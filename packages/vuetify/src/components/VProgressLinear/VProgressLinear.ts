import './VProgressLinear.sass'

// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import { convertToUnit } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { FunctionalComponentOptions } from 'vue/types'
import { VNode } from 'vue'

import {
  VFadeTransition,
  VSlideXTransition
} from '../transitions'

/* @vue/component */
export default mixins(Colorable).extend({
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
    rounded: Boolean,
    striped: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    backgroundStyle (): object {
      const backgroundOpacity = this.backgroundOpacity == null
        ? (this.backgroundColor ? 1 : 0.3)
        : parseFloat(this.backgroundOpacity)

      return {
        height: this.active ? convertToUnit(this.height) : 0,
        opacity: backgroundOpacity,
        width: `${this.normalizedBufer}%`
      }
    },
    classes (): object {
      return {
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
      if (this.value < 0) return 0
      if (this.value > 100) return 100
      return parseFloat(this.value)
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
    genBackground () {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor || this.color, {
        staticClass: 'v-progress-linear__background',
        style: this.backgroundStyle
      }))
    },
    genDeterminate () {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: `v-progress-linear__bar__determinate`,
        style: {
          width: convertToUnit(this.effectiveWidth, '%')
        }
      }))
    },
    genBar () {
      const children = [
        this.indeterminate ? this.genIndeterminate() : this.genDeterminate()
      ]

      return this.$createElement('div', {
        staticClass: 'v-progress-linear__bar',
        style: this.styles
      }, [
        this.$createElement(this.computedTransition, children)
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
    },
    genIndeterminate () {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__bar__indeterminate',
        class: {
          'v-progress-linear__bar__indeterminate--active': this.active
        }
      }, [
        this.genProgressBar('long'),
        this.genProgressBar('short')
      ])
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
        height: convertToUnit(this.height)
      },
      on: this.$listeners
    }, [
      this.genBackground(),
      this.genBar(),
      this.genContent()
    ])
  }
})
