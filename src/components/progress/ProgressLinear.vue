<template lang="pug">
  div(
    class="progress-linear"
    v-bind:class="classes"
    v-bind:style="{ height: height + 'px' }"
  )
    div(class="progress-linear__bar" v-bind:style="styles")
      v-fade-transition
        div(class="progress-linear__bar__indeterminate" v-if="indeterminate")
      v-slide-x-transition
        div(
          class="progress-linear__bar__determinate" 
          v-bind:style="{ width: value + '%' }"
          v-if="!indeterminate"
        )
</template>

<script>
  export default {
    name: 'progress',

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
        let styles = {}

        if (!this.active) {
          styles.height = 0
        }

        if (this.buffer) {
          styles.width = `${this.bufferValue}%`
        }

        return styles
      },

      bufferStyles () {
        let styles = {}

        if (!this.active) {
          styles.height = 0
        }

        return styles
      }
    }
  }
</script>