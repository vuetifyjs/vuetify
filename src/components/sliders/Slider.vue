<template lang="pug">
  div(v-bind:class="classes")
    v-icon(
      v-if="prependIcon" 
      class="input-group__prepend-icon"
    ) {{ prependIcon }}
    label(
      v-if="label" 
      v-html="label"
    )
    div(class="slider")
      div(class="slider__track" ref="track")
        div(
          class="slider__track-fill"
          v-bind:style="trackFillStyles"
        )
      div(
        class="slider__thumb-container"
        v-on:mousedown="onMouseDown"
        v-bind:style="thumbStyles"
        ref="thumb"
      )
        div(class="slider__thumb")
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
      label: String,
      prependIcon: String,
      min: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 100
      },
      value: [Number, String]
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
          'input-group--dirty': this.inputValue > this.min,
          'input-group--active': this.isActive
        }
      },
      inputValue: {
        get () {
          return this.value
        },
        set (val) {
          const inputValue = ((this.max - this.min) * (val / 100)).toFixed(2)
          this.inputWidth = inputValue
          this.$emit('input', Math.round(inputValue))
        }
      },
      thumbStyles () {
        return {
          left: `${this.inputWidth}%`
        }
      },
      trackFillStyles () {
        return {
          width: `${this.inputWidth}%`
        }
      }
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