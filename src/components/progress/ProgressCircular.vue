<template lang="pug">
  div(
    class="progress-circular"
    v-bind:class="classes"
    v-bind:style="styles"
  )
    svg(
      xmlns="http://www.w3.org/2000/svg"
      v-bind:height="svgSize"
      v-bind:width="svgSize"
      v-bind:viewBox="viewBox"
      v-bind:style="svgStyles"
    )
      circle(
        class="progress-circular__underlay"
        fill="transparent"
        v-bind:cx="cxy"
        v-bind:cy="cxy"
        v-bind:r="radius"
        v-bind:stroke-width="width"
        v-bind:stroke-dasharray="strokeDashArray"
        v-bind:stroke-dashoffset="0"
        v-if="!indeterminate"
      )
      circle(
        class="progress-circular__overlay"
        v-bind:fill="fill"
        v-bind:cx="cxy"
        v-bind:cy="cxy"
        v-bind:r="radius"
        v-bind:stroke-width="width"
        v-bind:stroke-dasharray="strokeDashArray"
        v-bind:stroke-dashoffset="strokeDashOffset"
      )
    div(class="progress-circular__info")
      slot
</template>

<script>
  export default {
    props: {
      fill: {
        type: [Boolean, String],
        default: () => this.indeterminate ? 'none' : 'transparent'
      },

      indeterminate: Boolean,

      rotate: {
        type: Number,
        default: 0
      },

      size: {
        type: Number,
        default: 32
      },

      width: {
        type: Number,
        default: 4
      },

      value: {
        type: Number,
        default: 0
      }
    },

    computed: {
      circumference () {
        return 2 * Math.PI * this.radius
      },

      classes () {
        return {
          'progress-circular--indeterminate': this.indeterminate
        }
      },

      cxy () {
        return this.indeterminate ? 50 : this.size / 2
      },

      normalizedValue () {
        if (this.value < 0) {
          return 0
        }

        if (this.value > 100) {
          return 100
        }

        return this.value
      },

      radius () {
        return this.indeterminate ? 20 : (this.size - this.width) / 2
      },

      strokeDashArray () {
        return Math.round(this.circumference * 1000) / 1000
      },

      strokeDashOffset () {
        return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
      },

      styles () {
        return { 
          height: `${this.size}px`, 
          width: `${this.size}px`
        }
      },

      svgSize () {
        return this.indeterminate ? false : this.size
      },

      svgStyles () {
        return {
          transform: `rotate(${this.rotate}deg)`
        }
      },

      viewBox () {
        return this.indeterminate ? '25 25 50 50' : false
      }
    }
  }
</script>