<template lang="pug">
  div(
    v-bind:class="classes"
    role="slider"
    v-on:click="onMouseMove"
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
        v-on:mousedown="onMouseDown"
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
            div(
              class="slider__thumb--label"
            )
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
        default: 2
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
          'input-group': true,
          'input-group--prepend-icon': this.prependIcon,
          'input-group--dark': this.dark,
          'input-group--light': this.light,
          'input-group--dirty': this.inputValue > this.min,
          'input-group--disabled': this.disabled,
          'input-group--active': this.isActive,
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
            this.inputWidth = ((this.max - this.min) * (val / 100))
          }

          let value = Math.round(this.inputWidth)

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
          transform: `translate3d(${this.tickInterval / 2 * this.stepSize}%, -50%, 0)`
        }
      },
      trackStyles () {
        const scale = 1 - (this.inputWidth / 100) - .012
        return {
          transform: `scaleX(${scale < .02 ? 0 : scale})`
        }
      },
      trackFillStyles () {
        const scale = this.inputWidth / 100 - .012
        return {
          transform: `scaleX(${scale < .02 ? 0 : scale})`
        }
      }
    },

    mounted () {
      this.inputValue = this.value
    },

    methods: {
      onMouseDown (e) {
        this.isActive = true
        document.addEventListener('mousemove', this.onMouseMove, false)
        document.addEventListener('mouseup', this.onMouseUp, false)
      },
      onMouseUp (e) {
        this.isActive = false
        document.removeEventListener('mousemove', this.onMouseMove, false)
      },
      onMouseMove (e) {
        let { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect()
        let { width: thumbWidth } = this.$refs.thumb.getBoundingClientRect()
        let left = (
          ((e.clientX - offsetLeft - thumbWidth)
          / trackWidth) * 100
        )

        this.inputValue = left < 0
          ? 0
          : left > 100
            ? 100
            : left
      }
    }
  }
</script>