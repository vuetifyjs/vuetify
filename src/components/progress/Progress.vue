<template lang="pug">
  div(
    class="progress"
    v-bind:class="classes"
    v-bind:style="{ height: this.height }"
  )
    div(
      class="progress__bar"
      v-bind:style="styles"
    )
</template>

<script>
  export default {
    props: {
      height: {
        type: String,
        default: '7px'
      },

      indeterminate: Boolean,

      max: {
        type: [String, Number],
        default: 0
      },

      min: {
        type: [String, Number],
        default: 0
      },

      value: {
        type: [String, Number],
        default: 0
      }
    },

    computed: {
      classes () {
        return {
          'progress--indeterminate': this.indeterminate
        }
      },

      styles () {
        return {
          'width': `${this.value}%`
        }
      }
    }
  }
</script>