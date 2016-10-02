<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    props: {
      error: {
        type: Boolean,
        default: false
      },

      info: {
        type: Boolean,
        default: false
      },

      success: {
        type: Boolean,
        default: false
      },

      warning: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'alert--error': this.error,
          'alert--info': this.info,
          'alert--success': this.success,
          'alert--warning': this.warning,
        }
      }
    }
  }
</script>