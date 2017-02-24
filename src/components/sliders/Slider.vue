<template lang="pug">
  div(
    v-bind:class="classes"
    role="slider"
    v-on:mouseup="sliderMove"
    v-click-outside
  )
    v-icon(
      v-if="prependIcon" 
      class="input-group__prepend-icon"
    ) {{ prependIcon }}
    label(
      v-if="label" 
      v-html="label"
    )
    div(class="slider")
      div(
        class="slider__track__container"
        ref="track"
      )
        div(
          class="slider__track"
          v-bind:style="trackStyles"
        )
        div(
          class="slider__track-fill"
          v-bind:style="trackFillStyles"
        )
      div(
        class="slider__ticks-container"
        v-bind:style="tickContainerStyles"
        v-if="tickInterval"
      )
        div(
          class="slider__ticks"
          v-bind:style="tickStyles"
        )
      div(
        v-bind:class="thumbContainerClasses"
        v-on:touchstart.stop="onMouseDown"
        v-on:mousedown.stop="onMouseDown"
        v-bind:style="thumbStyles"
        ref="thumb"
      )
        div(class="slider__thumb")
        v-scale-transition(
          origin="bottom center"
          v-if="thumbLabel"
        )
          div(
            class="slider__thumb--label__container"
            v-if="isActive"
          )
            div(class="slider__thumb--label")
              span {{ inputValue }}
</template>

<script>
  import { addOnceEventListener } from '../../util/helpers'

  export default {
    name: 'slider',

    data () {
      return {
        isActive: false,
        inputWidth: 0
      }
    },

    props: {
      dark: Boolean,
      disabled: Boolean,
      label: String,
      light: Boolean,
      inverted: Boolean,
      min: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 100
      },
      prependIcon: String,
      stepSize: {
        type: [Number, String],
        default: 1
      },
      tickInterval: [Number, String],
      thumbLabel: Boolean,
      value: [Number, String],
      vertical: Boolean
    },

    watch: {
      value () {
        this.inputValue = this.value
      }
    },

    computed: {
      classes () {
        return {
          'input-group input-group--slider': true,
          'input-group--active': this.isActive,
          'input-group--dark': this.dark,
          'input-group--dirty': this.inputValue > this.min,
          'input-group--disabled': this.disabled,
          'input-group--light': this.light,
          'input-group--prepend-icon': this.prependIcon,
          'input-group--ticks': this.tickInterval
        }
      },
      inputValue: {
        get () {
          return this.value
        },
        set (val) {
          // Do not re-calc width if not needed, causes jump
          if (val !== Math.round(this.inputWidth)) {
            this.inputWidth = (100 * (val / this.max))
          }

          let value = Math.round(val)

          value = value < this.min ? 0 : value > this.max ? this.max : value

          this.$emit('input', value)
        }
      },
      thumbContainerClasses () {
        return {
          'slider__thumb-container': true,
          'slider__thumb-container--label': this.thumbLabel
        }
      },
      thumbStyles () {
        return {
          left: `${this.inputWidth}%`
        }
      },
      tickContainerStyles () {
        return {
          transform: `translate3d(-${this.tickInterval / 2 * this.stepSize}%, -50%, 0)`
        }
      },
      tickStyles () {
        return {
          backgroundSize: `${this.tickInterval * this.stepSize}% 2px`,
          transform: `translate3d(${this.tickInterval / 2 * this.stepSize}%, 0, 0)`
        }
      },
      trackStyles () {
        const scaleX = this.calculateScale(1 - (this.inputWidth / 100))
        const translateX = this.inputWidth < 1 && !this.thumbLabel ? `${8}px` : 0
        return {
          transform: `scaleX(${scaleX}) translateX(${translateX})`
        }
      },
      trackFillStyles () {
        const scaleX = this.calculateScale(this.inputWidth / 100)
        const translateX = this.inputWidth > 99 && !this.thumbLabel ? `${-8}px` : 0
        return {
          transform: `scaleX(${scaleX}) translateX(${translateX})`
        }
      }
    },

    mounted () {
      this.inputValue = this.value
    },

    methods: {
      calculateScale (scale) {
        if (scale < .02 && !this.thumbLabel) {
          return 0
        }

        return this.disabled ? scale - .015 : scale
      },
      onMouseDown (e) {
        this.isActive = true
        document.addEventListener('touchmove', this.onMouseMove, false)
        document.addEventListener('pointermove', this.onMouseMove, false)
        document.addEventListener('mouseup', this.onMouseUp, false)
      },
      onMouseUp (e) {
        this.isActive = false
        document.removeEventListener('pointermove', this.onMouseMove, false)
        document.removeEventListener('touchmove', this.onMouseMove, false)
      },
      onMouseMove (e) {
        let { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect()
        let { width: thumbWidth } = this.$refs.thumb.getBoundingClientRect()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        let left = (
          ((clientX - offsetLeft - thumbWidth)
          / trackWidth) * 100
        )

        left = left < 0 ? 0 : left > 100 ? 100 : left

        this.inputValue = this.max * (left / 100)
      },
      sliderMove (e) {
        if (!this.isActive) {
          this.onMouseMove(e)
        }
      }
    }
  }
</script>