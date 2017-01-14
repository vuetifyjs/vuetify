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
      buffer: Boolean,

      bufferValue: Number,

      height: {
        type: Number,
        default: 7
      },

      indeterminate: Boolean,

      hide: Boolean,

      query: Boolean,

      value: {
        type: Number,
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
        let styles = {}

        if (this.hide) {
          styles.height = 0
        }

        if (this.buffer) {
          styles.width = `${this.bufferValue}%`
        }

        return styles
      },

      bufferStyles () {
        let styles = {}

        if (this.hide) {
          styles.height = 0
        }

        return styles
      }
    }
  }
</script>