<script>
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

    props: {
      active: {
        type: Boolean,
        default: true
      },
      buffer: Boolean,
      bufferValue: Number,
      error: Boolean,
      height: {
        type: [Number, String],
        default: 7
      },
      indeterminate: Boolean,
      info: Boolean,
      secondary: Boolean,
      success: Boolean,
      query: Boolean,
      warning: Boolean,
      value: {
        type: [Number, String],
        default: 0
      },
      colorFront: {
        type: String,
        default: null
      },
      colorBack: {
        type: String,
        default: null
      }
    },

    computed: {
      classes () {
        return {
          'progress-linear--query': this.query,
          'progress-linear--secondary': this.secondary,
          'progress-linear--success': this.success,
          'progress-linear--info': this.info,
          'progress-linear--warning': this.warning,
          'progress-linear--error': this.error
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
          class: ['progress-linear__bar__determinate', this.colorFront],
          style: { width: `${this.value}%` }
        })
      },
      genBar (h, name) {
        return h('div', {
          class: [
            'progress-linear__bar__indeterminate',
            name,
            this.colorFront
          ]
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

      const bar = h('div', { class: ['progress-linear__bar', this.colorBack], style: this.styles }, [fade, slide])

      return h('div', {
        class: ['progress-linear', this.classes],
        style: { height: `${this.height}px` },
        on: this.$listeners
      }, [bar])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_progress-linear.styl"></style>
