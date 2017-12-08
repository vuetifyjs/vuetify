<template lang="pug">
  v-alert(
    :color="computedColor"
    :icon="computedIcon"
    value
  ).my-4.app-alert
    markdown(:source="$t(value)")
</template>

<script>
  export default {
    name: 'app-alert',

    props: {
      error: Boolean,
      info: Boolean,
      success: Boolean,
      warning: Boolean,
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      computedColor () {
        if (this.error) return 'error'
        else if (this.info) return 'info'
        else if (this.success) return 'success'
        else if (this.warning) return 'warning'
      },
      computedIcon () {
        switch (this.computedColor) {
          case 'error':
            return 'warning'
          break
          case 'info':
            return 'info'
          break
          case 'success':
            return 'check_circle'
          break
          case 'warning':
            return 'priority_high'
          break
        }
      }
    }
  }
</script>

<style>
  .app-alert p {
    margin: 0 !important;
  }
</style>
