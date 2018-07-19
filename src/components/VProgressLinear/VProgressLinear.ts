import '../../stylus/components/_progress-linear.styl'

// Mixins
import Colorable from '../../mixins/colorable'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { CreateElement, VNode } from 'vue'

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
      default: 7
    },
    indeterminate: Boolean,
    query: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    styles (): object {
      const styles: Record<string, any> = {}

      if (!this.active) {
        styles.height = 0
      }

      if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
        styles.width = `${this.bufferValue}%`
      }

      return styles
    },
    effectiveWidth (): number {
      if (!this.bufferValue) {
        return 0
      }

      return +this.value * 100 / +this.bufferValue
    },
    backgroundStyle (): object {
      const backgroundOpacity = this.backgroundOpacity == null
        ? (this.backgroundColor ? 1 : 0.3)
        : parseFloat(this.backgroundOpacity)

      return {
        height: this.active ? convertToUnit(this.height) : 0,
        opacity: backgroundOpacity,
        width: `${this.bufferValue}%`
      }
    }
  },

  methods: {
    genDeterminate (h: CreateElement): VNode {
      return h('div', {
        ref: 'front',
        staticClass: `v-progress-linear__bar__determinate`,
        class: this.addBackgroundColorClassChecks(),
        style: {
          width: `${this.effectiveWidth}%`
        }
      })
    },
    genBar (h: CreateElement, name: string): VNode {
      return h('div', {
        staticClass: 'v-progress-linear__bar__indeterminate',
        class: this.addBackgroundColorClassChecks({
          [name]: true
        })
      })
    },
    genIndeterminate (h: CreateElement): VNode {
      return h('div', {
        ref: 'front',
        staticClass: 'v-progress-linear__bar__indeterminate',
        class: {
          'v-progress-linear__bar__indeterminate--active': this.active
        }
      }, [
        this.genBar(h, 'long'),
        this.genBar(h, 'short')
      ])
    }
  },

  render (h): VNode {
    const fade = h(VFadeTransition, this.indeterminate ? [this.genIndeterminate(h)] : [])
    const slide = h(VSlideXTransition, this.indeterminate ? [] : [this.genDeterminate(h)])

    const bar = h('div', {
      staticClass: 'v-progress-linear__bar',
      style: this.styles
    }, [fade, slide])
    const background = h('div', {
      staticClass: 'v-progress-linear__background',
      class: [this.backgroundColor || this.color],
      style: this.backgroundStyle
    })

    return h('div', {
      staticClass: 'v-progress-linear',
      class: {
        'v-progress-linear--query': this.query
      },
      style: {
        height: convertToUnit(this.height)
      },
      on: this.$listeners
    }, [
      background,
      bar
    ])
  }
})
