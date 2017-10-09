require('../../stylus/components/_progress-linear.styl')

import Colorable from '../../mixins/colorable'

import {
  VFadeTransition,
  VSlideXTransition
} from '../transitions'

export default {
  name: 'v-progress-linear',

  components: {
    VFadeTransition,
    VSlideXTransition
  },

  mixins: [Colorable],

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
    styles () {
      const styles = {}

      if (!this.active) {
        styles.height = 0
      }

      if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
        styles.width = `${this.bufferValue}%`
      }

      return styles
    },
    effectiveWidth () {
      if (!this.bufferValue) {
        return 0
      }

      return this.value * 100 / this.bufferValue
    },
    bufferStyles () {
      const styles = {}

      if (!this.active) {
        styles.height = 0
      }

      return styles
    },
    backgroundStyle () {
      const backgroundOpacity = this.backgroundOpacity == null
        ? (this.backgroundColor ? 1 : 0.3)
        : parseFloat(this.backgroundOpacity)

      return {
        height: this.active ? 'auto' : 0,
        opacity: backgroundOpacity,
        width: `${this.bufferValue}%`
      }
    }
  },

  methods: {
    genDeterminate (h) {
      return h('div', {
        ref: 'front',
        staticClass: `progress-linear__bar__determinate`,
        class: this.addBackgroundColorClassChecks({}),
        style: {
          width: `${this.effectiveWidth}%`
        }
      })
    },
    genBar (h, name) {
      return h('div', {
        staticClass: 'progress-linear__bar__indeterminate',
        class: this.addBackgroundColorClassChecks({
          [name]: true
        })
      })
    },
    genIndeterminate (h) {
      return h('div', {
        ref: 'front',
        staticClass: 'progress-linear__bar__indeterminate',
        class: {
          'progress-linear__bar__indeterminate--active': this.active
        }
      }, [
        this.genBar(h, 'long'),
        this.genBar(h, 'short')
      ])
    }
  },

  render (h) {
    const fade = h('v-fade-transition', [this.indeterminate && this.genIndeterminate(h)])
    const slide = h('v-slide-x-transition', [!this.indeterminate && this.genDeterminate(h)])

    const bar = h('div', {
      staticClass: 'progress-linear__bar',
      style: this.styles
    }, [fade, slide])
    const background = h('div', {
      staticClass: 'progress-linear__background',
      class: [this.backgroundColor || this.color],
      style: this.backgroundStyle
    })

    return h('div', {
      staticClass: 'progress-linear',
      class: {
        'progress-linear--query': this.query
      },
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [
      background,
      bar
    ])
  }
}
