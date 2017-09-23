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
    backgroundOpacity: {
      type: [Number, String],
      default: 0.3
    },
    buffer: Boolean,
    bufferValue: Number,
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
    classes () {
      return {
        'progress-linear--query': this.query
      }
    },
    styles () {
      const styles = {}

      if (!this.active) {
        styles.height = 0
      }

      if (this.buffer) {
        styles.width = `${this.bufferValue}%`
      }

      return styles
    },
    effectiveWidth () {
      if (!this.buffer) {
        return this.value
      } else if (this.bufferValue) {
        return Math.min(this.bufferValue, this.value) * 100 / this.bufferValue
      } else {
        return 0
      }
    },
    bufferStyles () {
      const styles = {}

      if (!this.active) {
        styles.height = 0
      }

      return styles
    }
  },

  methods: {
    genDeterminate (h) {
      return h('div', {
        ref: 'front',
        class: {
          'progress-linear__bar__determinate': true,
          [this.color]: true
        },
        style: {
          width: `${this.effectiveWidth}%`
        }
      })
    },
    genBar (h, name) {
      return h('div', {
        class: {
          'progress-linear__bar__indeterminate': true,
          [name]: true,
          [this.color]: true
        }
      })
    },
    genIndeterminate (h) {
      return h('div', {
        ref: 'front',
        class: {
          'progress-linear__bar__indeterminate': true,
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

    const bar = h('div', { class: ['progress-linear__bar'], style: this.styles }, [fade, slide])
    const background = h('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: this.backgroundOpacity
      },
      class: this.color
    })

    return h('div', {
      class: ['progress-linear', this.classes],
      style: { height: `${this.height}px` },
      on: this.$listeners
    }, [
      background,
      bar
    ])
  }
}
